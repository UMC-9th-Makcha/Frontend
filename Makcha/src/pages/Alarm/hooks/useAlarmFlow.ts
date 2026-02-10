import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { OriginSearchItem } from "../types/search";
import type { AlarmRoute } from "../types/alarm";
import type { RouteConfirmDetail } from "../types/routeConfirm";
import { api } from "../../../apis/api";
import { formatHHMM, formatMinutesLeftText, formatEtaText } from "../utils/format";
import { stepsToSegments, candidatesToRoutes } from "../utils/mapper";

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
    notificationId?: number;
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

export type CandidatePoint = { lat: number; lng: number };

export type CandidateStation = {
    name: string;
    lat: number;
    lng: number;
    id: number;
};

export type CandidateStep = {
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

export type Candidate = {
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

type AlertDetailResult = {
    notification_id: number;

    is_optimal: boolean;
    lines: string[];
    total_duration_min: number;
    transfer_count: number;
    walking_time_min: number;
    minutes_left: number;

    departure_at?: string;
    arrival_at?: string;

    steps: CandidateStep[];
};

const fetchAlertDetail = async (notificationId: number) => {
    const res = await api.get<BaseResponse<AlertDetailResult>>(
        `/api/alerts/${notificationId}/detail`
    );
    return res.data.result;
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

    const [historyConfirm, setHistoryConfirm] = useState<{
        notificationId: number;
        detail: RouteConfirmDetail;
    } | null>(null);

    const [deletingAlert, setDeletingAlert] = useState(false);

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

        const res = await api.post<BaseResponse<{ candidates: Candidate[] }>>(
            "/api/routes/candidates",
            body
        );
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
            setHistoryConfirm(null);
            cameFromHistoryRef.current = false;

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
        cameFromHistoryRef.current = false;
        setHistoryConfirm(null);
        setSelectedRoute(route);
        setStep("CONFIRM");
    };

    const handlePreviewRouteById = (routeId: string) => {
        const found = routes.find((r) => r.id === routeId) ?? null;
        if (found) setSelectedRoute(found);
    };

    const getConfirmDetail = (routeId: string): RouteConfirmDetail => {
        if (historyConfirm && selectedRoute?.id === routeId) {
            return historyConfirm.detail;
        }

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

    // history confirm: 알림 삭제
    const deleteCurrentAlert = async () => {
        const notificationId = historyConfirm?.notificationId;
        if (!notificationId) return;

        try {
            setDeletingAlert(true);
            await api.delete(`/api/alerts/${notificationId}`); // 백엔드 endpoint에 맞게 조정
            navigate("/history", { replace: true });
        } catch (e) {
            console.error("[alerts:delete] failed", e);
            alert("알림 삭제 실패");
        } finally {
            setDeletingAlert(false);
        }
    };

    {/* History → Alarm(Confirm) 진입 처리 */}
    useEffect(() => {
        const open = navState?.openConfirm;
        const notificationId = navState?.notificationId;

        if (!open || !notificationId) return;

        cameFromHistoryRef.current = navState.from === "history";

        (async () => {
            try {
                setStep("LOADING");

                const data = await fetchAlertDetail(notificationId);
                const segments = stepsToSegments(data.steps ?? []);

                const route: AlarmRoute = {
                    id: `history-${notificationId}`,
                    cacheKey: "",
                    routeToken: "",
                    isOptimal: Boolean(data.is_optimal),
                    routeType: "SUBWAY",
                    lines: data.lines ?? [],

                    minutesLeft: data.minutes_left ?? 0,
                    timeUntilDeparture: formatMinutesLeftText(data.minutes_left ?? 0),
                    departureTime: formatHHMM(data.departure_at),
                    totalDurationMin: data.total_duration_min ?? 0,
                    transferCount: data.transfer_count ?? 0,
                    walkingTimeMin: data.walking_time_min ?? 0,
                    segments,
                };

                setSelectedRoute(route);

                setHistoryConfirm({
                    notificationId,
                    detail: {
                        etaText: formatEtaText(data.arrival_at ?? data.departure_at),
                        segments,
                    },
                });

                setStep("CONFIRM");
            } catch (e) {
                console.error("[history confirm] failed", e);
                setStep("INPUT");
                alert("알림 상세 조회 실패");
            } finally {
                navigate(".", { replace: true, state: null }); 
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navState?.openConfirm, navState?.notificationId]);

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
        isFromHistory: cameFromHistoryRef.current,
        deleteCurrentAlert,
        deletingAlert,
    };
}
