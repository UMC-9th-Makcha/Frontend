import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { OriginSearchItem } from "../types/search";
import type { AlarmRoute } from "../types/alarm";
import type { RouteConfirmDetail } from "../types/routeConfirm";
import { formatEtaText } from "../utils/format";
import { stepsToSegments, candidatesToRoutes } from "../utils/mapper";
import { createAlert, deleteAlert } from "../apis/alerts";
import { fetchCandidates, toCandidatesPointBody } from "../apis/routes";
import type { Candidate } from "../types/candidate";
import { useHistoryConfirm } from "./useHistoryConfirm";

export type Step = "INPUT" | "LOADING" | "RESULT" | "CONFIRM" | "SUCCESS";
export type SearchTarget = "ORIGIN" | "DESTINATION";

type NavState = {
    from?: "history";
    openConfirm?: boolean;
    routeId?: string;
    notificationId?: number;
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

    const { mutateAsync: cancelMutateAsync, isPending: deletingAlert } = useCancelAlert();

    const startRouteSearch = async (o: OriginSearchItem, d: OriginSearchItem) => {
        setStep("LOADING");

        const minDelay: Promise<void> = new Promise((resolve) => setTimeout(resolve, 300));

        try {
            const [candidates] = await Promise.all([
                fetchCandidates({
                    origin: toCandidatesPointBody(o),
                    destination: toCandidatesPointBody(d),
                }),
                minDelay,
            ]);

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

    const deleteCurrentAlert = async () => {
        const notificationId = historyConfirm?.notificationId;
        if (!notificationId) return;

        try {
            setDeletingAlert(true);
            await deleteAlert(notificationId);
            navigate("/history", { replace: true });
        } catch (e) {
            console.error("[alerts:cancel] failed", e);
            alert("알림 취소 실패");
        }
    };

    useHistoryConfirm({
        navState: navState
            ? {
                from: navState.from,
                openConfirm: navState.openConfirm,
                notificationId: navState.notificationId,
            }
            : null,
        setStep,
        setSelectedRoute,
        setHistoryConfirm,
        setRoutes,
        cameFromHistoryRef,
    });

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