import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { OriginSearchItem } from "../types/search";
import type { AlarmRoute } from "../types/alarm";
import type { RouteConfirmDetail } from "../types/routeConfirm";
import { formatEtaText } from "../utils/format";
import { stepsToSegments } from "../utils/mapper";
import { createAlert } from "../apis/alerts";
import type { Candidate } from "../types/candidate";
import { useCancelAlert } from "./useCancelAlert";
import { useCandidatesSearch } from "./useCandidatesSearch";
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
    
    const [isFromHistory, setIsFromHistory] = useState(false);
    const cameFromHistoryRef = useRef(false);

    const [historyConfirm, setHistoryConfirm] = useState<{
        notificationId: number;
        detail: RouteConfirmDetail;
    } | null>(null);

    const { mutateAsync: cancelMutateAsync, isPending: deletingAlert } = useCancelAlert();

    const { startRouteSearch } = useCandidatesSearch({
        setStep,
        setCandidatesRaw,
        setRoutes,
        setSelectedRoute,
        setHistoryConfirm,
        cameFromHistoryRef,
    });

    useHistoryConfirm({
        navState,
        setStep,
        setRoutes,
        setSelectedRoute,
        setHistoryConfirm,
        cameFromHistoryRef,
    });

    useEffect(() => {
        if (isFromHistory !== cameFromHistoryRef.current) {
            setIsFromHistory(cameFromHistoryRef.current);
        }
    }, [step, selectedRoute, historyConfirm]);

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
        setIsFromHistory(false);
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
        if (!cand) return { etaText: "도착 정보 없음", segments: [] };

        return {
            etaText: formatEtaText(cand.card?.deadline_at),
            segments: stepsToSegments(cand.detail?.steps ?? []),
        };
    };

    const backFromConfirm = () => {
        if (isFromHistory) {
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
            await createAlert({ cacheKey: selectedRoute.cacheKey, alert_time: 10 });
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
            await cancelMutateAsync(notificationId);
            navigate("/history", { replace: true });
        } catch (e) {
            console.error("[alerts:cancel] failed", e);
            alert("알림 취소 실패");
        }
    };

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
        isFromHistory,
        deleteCurrentAlert,
        deletingAlert,
    };
}