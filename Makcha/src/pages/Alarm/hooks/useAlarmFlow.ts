import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { OriginSearchItem } from "../types/search";
import type { AlarmRoute } from "../types/alarm";
import type { RouteConfirmDetail, RouteConfirmSegment } from "../types/routeConfirm";
import { api } from "../../../apis/api";
import type { PathType } from "../../../types/map";

export type Step = "INPUT" | "LOADING" | "RESULT" | "CONFIRM" | "SUCCESS";
export type SearchTarget = "ORIGIN" | "DESTINATION";

type CreateAlertBody = {
    cacheKey: string;
    alert_time?: number;
};


type NavState = {
    from?: "history";
    openConfirm?: boolean;
    routeId?: string;
};

type BaseResponse<T> = {
    successCode: string;
    statusCode: number;
    message: string;
    result: T;
};

const createAlert = async (body: CreateAlertBody) => {
    const res = await api.post<BaseResponse<unknown>>("/api/alerts", body);
    return res.data.result;
};

type CandidatePoint = { lat: number; lng: number };

type CandidateStation = {
    name: string;
    lat: number;
    lng: number;
    id: number;
};

type CandidateStep = {
    type: string;
    points: CandidatePoint[];
    section_time: number;
    distance: number;
    station_count: number;

    from: CandidateStation;
    to: CandidateStation;

    bus_numbers: string[];
    bus_types: number[];

    subway_lines: string[];
    way: string;
    way_code: number;
    subway_type: number | null;
};

type Candidate = {
    candidate_key: string;
    route_token: string;
    is_optimal: boolean;
    tags: string[];
    card: {
        traveled_time: number;
        transfer_count: number;
        public_transit_fare: number;
        walk_time: number;
        deadline_at: string;
        minutes_left: number;
    };
    detail: {
        steps: CandidateStep[];
    };
};

export function useAlarmFlow() {
    const navigate = useNavigate();
    const location = useLocation();
    const navState = (location.state ?? null) as NavState | null;

    const [step, setStep] = useState<Step>("INPUT");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTarget, setSearchTarget] = useState<SearchTarget>("ORIGIN");

    const [origin, setOrigin] = useState<OriginSearchItem | null>(null);
    const [destination, setDestination] = useState<OriginSearchItem | null>(null);

    const [routes, setRoutes] = useState<AlarmRoute[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<AlarmRoute | null>(null);

    const [candidatesRaw, setCandidatesRaw] = useState<Candidate[]>([]);
    const cameFromHistoryRef = useRef(false);

    const formatHHMM = (iso?: string) => {
        if (!iso) return "";
        const d = new Date(iso);
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        return `${hh}:${mm}`;
    };

    const formatMinutesLeftText = (minutesLeft: number) => {
        if (!Number.isFinite(minutesLeft)) return "";
        if (minutesLeft <= 0) return "지금 출발";
        const h = Math.floor(minutesLeft / 60);
        const m = minutesLeft % 60;
        if (h <= 0) return `출발까지 ${m}분`;
        if (m === 0) return `출발까지 ${h}시간`;
        return `출발까지 ${h}시간 ${m}분`;
    };

    const formatEtaText = (iso?: string) => {
        const hhmm = formatHHMM(iso);
        return hhmm ? `${hhmm} 도착` : "";
    };

    const extractChips = (cand: Candidate): string[] => {
        const steps = cand.detail?.steps ?? [];
        const chips: string[] = [];

        for (const s of steps) {
            if (s.type === "SUBWAY") {
                const lineName = s.subway_lines?.[0];
                if (lineName) chips.push(lineName.replace("수도권 ", "").replace(" ", ""));
            }

            if (typeof s.type === "string" && s.type.startsWith("SUBWAY_")) {
                const n = s.subway_type ?? Number(s.type.replace("SUBWAY_", ""));
                if (Number.isFinite(n)) chips.push(`${n}호선`);
            }

            if (s.type === "BUS" || (typeof s.type === "string" && s.type.startsWith("BUS"))) {
                const nums: string[] = s.bus_numbers ?? [];
                nums.forEach((x) => chips.push(x));
            }
        }

        return chips.length ? chips : (cand.tags ?? []);
    };

    const busTypeToMapType = (t?: number | null): PathType => {
        if (t === 4 || t === 6 || t === 14 || t === 15) return "BUS_RED";
        if (t === 11) return "BUS_BLUE";
        if (t === 1 || t === 2 || t === 3 || t === 12) return "BUS_GREEN";

        return "BUS_BLUE";
    };

    const subwayTypeToMapType = (t?: number | null): PathType => {
        const n = Number(t);
        if (Number.isFinite(n)) {
            if (n >= 1 && n <= 9) return `SUBWAY_${n}` as PathType;
            if (n === 116) return "SUBWAY_SUIN";
        }
        return "SUBWAY_2";
    };

    function stepsToSegments(steps: CandidateStep[]): RouteConfirmSegment[] {
        return steps.map((s) => {
            if (s.type === "WALK") {
                return {
                    mode: "WALK",
                    durationMin: s.section_time ?? 0,
                    distanceM: s.distance ?? undefined,
                    mapType: "WALK",
                };
            }

            if (s.type === "SUBWAY" || (typeof s.type === "string" && s.type.startsWith("SUBWAY"))) {
                const lineLabel =
                    s.subway_lines?.[0]?.replace("수도권 ", "").replace(" ", "") ??
                    (Number.isFinite(s.subway_type ?? NaN) ? `${s.subway_type}호선` : "지하철");

                return {
                    mode: "SUBWAY",
                    lineLabel,
                    from: s.from?.name ?? "출발",
                    to: s.to?.name ?? "도착",
                    durationMin: s.section_time ?? 0,
                    stops: s.station_count ?? undefined,
                    mapType: subwayTypeToMapType(s.subway_type),
                };
            }

            if (s.type === "BUS" || (typeof s.type === "string" && s.type.startsWith("BUS"))) {
                const busNo = s.bus_numbers?.[0] ?? "버스";
                const busType = s.bus_types?.[0] ?? null;
                return {
                    mode: "BUS",
                    lineLabel: busNo,
                    from: s.from?.name ?? "출발",
                    to: s.to?.name ?? "도착",
                    durationMin: s.section_time ?? 0,
                    stops: s.station_count ?? undefined,
                    mapType: busTypeToMapType(busType),
                };
            }

            return {
                mode: "WALK",
                durationMin: s.section_time ?? 0,
                distanceM: s.distance ?? undefined,
                mapType: "WALK",
            };
        });
    }

    const candidatesToRoutes = (candidates: Candidate[]): AlarmRoute[] => {
        return candidates.map((c) => {
            const minutesLeft = c.card?.minutes_left ?? 0;

            return {
                id: c.candidate_key,
                cacheKey: c.candidate_key,
                routeToken: c.route_token,
                isOptimal: c.is_optimal,
                routeType: c.tags?.includes("SUBWAY")
                    ? "SUBWAY"
                    : c.tags?.includes("NIGHT_BUS")
                        ? "NIGHT_BUS"
                        : "BUS",
                lines: extractChips(c),

                minutesLeft,
                timeUntilDeparture: formatMinutesLeftText(minutesLeft),
                departureTime: formatHHMM(c.card?.deadline_at),
                totalDurationMin: c.card?.traveled_time ?? 0,
                transferCount: c.card?.transfer_count ?? 0,
                walkingTimeMin: c.card?.walk_time ?? 0,
                segments: stepsToSegments(c.detail?.steps ?? []),
            };
        });
    };

    const fetchCandidates = async (o: OriginSearchItem, d: OriginSearchItem) => {
        if (
            typeof o.lat !== "number" ||
            typeof o.lng !== "number" ||
            typeof d.lat !== "number" ||
            typeof d.lng !== "number"
        ) {
            throw new Error("출발/도착 좌표(lat/lng)가 없습니다.");
        }

        const body = {
            origin: { lat: o.lat, lng: o.lng },
            destination: { lat: d.lat, lng: d.lng },
        };

        const res = await api.post<BaseResponse<{ candidates: Candidate[] }>>("/api/routes/candidates", body);
        return res.data.result.candidates;
    };

    const startRouteSearch = async (o: OriginSearchItem, d: OriginSearchItem) => {
        setStep("LOADING");

        const minDelay: Promise<void> = new Promise((resolve) => setTimeout(resolve, 300));

        try {
            const [candidates] = await Promise.all([fetchCandidates(o, d), minDelay]);

            setCandidatesRaw(candidates);
            setRoutes(candidatesToRoutes(candidates));
            setSelectedRoute(null);

            setStep("RESULT");
        } catch (e) {
            console.error("[routes:candidates] failed", e);
            setCandidatesRaw([]);
            setRoutes([]);
            setSelectedRoute(null);
            setStep("RESULT");
        }
    };

    const openOriginSheet = () => {
        setSearchTarget("ORIGIN");
        setIsSearchOpen(true);
    };

    const openDestinationSheet = () => {
        setSearchTarget("DESTINATION");
        setIsSearchOpen(true);
    };

    const handleSelect = (target: SearchTarget, item: OriginSearchItem) => {
        if (target === "ORIGIN") {
            setOrigin(item);
            setIsSearchOpen(false);
            if (destination) startRouteSearch(item, destination);
            return;
        }

        setDestination(item);
        setIsSearchOpen(false);

        if (origin) {
            startRouteSearch(origin, item);
        } else {
            setSearchTarget("ORIGIN");
            setIsSearchOpen(true);
        }
    };

    const handleSelectDestinationFromPanel = (item: OriginSearchItem) => {
        setSearchTarget("DESTINATION");
        handleSelect("DESTINATION", item);
    };

    const handleSelectRoute = (route: AlarmRoute) => {
        setSelectedRoute(route);
        setStep("CONFIRM");
    };

    const handlePreviewRouteById = (routeId: string) => {
        const found = routes.find((r) => r.id === routeId) ?? null;
        if (found) setSelectedRoute(found);
    };

    const getConfirmDetail = (routeId: string): RouteConfirmDetail => {
        const cand = candidatesRaw.find((c) => c.candidate_key === routeId);

        if (!cand) {
            return { etaText: "도착 정보 없음", segments: [] };
        }

        return {
            etaText: formatEtaText(cand.card?.deadline_at),
            segments: stepsToSegments(cand.detail?.steps ?? []),
        };
    };

    const backFromConfirm = () => {
        if (cameFromHistoryRef.current) {
            navigate("/history", { replace: true });
            return;
        }
        setStep("RESULT");
    };

    const confirmRoute = async () => {
        if (!selectedRoute?.cacheKey) {
            alert("경로 cacheKey가 없습니다.");
            return;
        }

        try {
            await createAlert({
                cacheKey: selectedRoute.cacheKey,
                alert_time: 10,
            });

            setStep("SUCCESS");
        } catch (e) {
            console.error("[alerts:create] failed", e);
            alert("알림 예약 생성 실패");
        }
    };

    const goAlarmList = () => navigate("/history");

    useEffect(() => {
        if (!navState?.openConfirm || !navState.routeId) return;
        cameFromHistoryRef.current = navState.from === "history";
        navigate(".", { replace: true, state: null });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navState?.openConfirm, navState?.routeId]);

    return {
        step,
        isSearchOpen,
        searchTarget,
        origin,
        destination,
        routes,
        selectedRoute,

        setIsSearchOpen,
        setSearchTarget,
        setStep,

        openOriginSheet,
        openDestinationSheet,
        handleSelect,
        handleSelectDestinationFromPanel,
        handleSelectRoute,
        handlePreviewRouteById,

        getConfirmDetail,
        backFromConfirm,
        confirmRoute,
        goAlarmList,
    };
}
