import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ALARM_ROUTES_MOCK } from "../mocks/alarmMock";
import { ROUTE_CONFIRM_DETAIL_MOCK } from "../mocks/routeConfirmMock";
import type { OriginSearchItem } from "../types/search";
import type { AlarmRoute } from "../types/alarm";
import type { RouteConfirmDetail } from "../types/routeConfirm";

export type Step = "INPUT" | "LOADING" | "RESULT" | "CONFIRM" | "SUCCESS";
export type SearchTarget = "ORIGIN" | "DESTINATION";

type NavState = {
    from?: "history";
    openConfirm?: boolean;
    routeId?: string;
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

    const cameFromHistoryRef = useRef(false);

    const startRouteSearch = () => {
        setStep("LOADING");
        window.setTimeout(() => {
            const mockRoutes = ALARM_ROUTES_MOCK;
            setRoutes(mockRoutes);

            setSelectedRoute(null);

            setStep("RESULT");
        }, 1200);
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

            if (destination) startRouteSearch();
            return;
        }

        // DESTINATION
        setDestination(item);
        setIsSearchOpen(false);

        if (origin) {
            startRouteSearch();
        } else {
            setSearchTarget("ORIGIN");
            setIsSearchOpen(true);
        }
    };

    const handleSelectDestinationFromPanel = (item: OriginSearchItem) => {
        setSearchTarget("DESTINATION");
        handleSelect("DESTINATION", item);
    };

    // RESULT에서 route 선택 → CONFIRM 이동
    const handleSelectRoute = (route: AlarmRoute) => {
        setSelectedRoute(route);
        setStep("CONFIRM");
    };

    // 지도에서 route 클릭 -> 강조(색) 변경
    const handlePreviewRouteById = (routeId: string) => {
        const found = routes.find((r) => r.id === routeId) ?? null;
        if (found) setSelectedRoute(found);
    };

    const getConfirmDetail = (routeId: string): RouteConfirmDetail => {
        return (
            ROUTE_CONFIRM_DETAIL_MOCK[routeId] ?? {
                etaText: "도착 정보 없음",
                segments: [],
            }
        );
    };

    const backFromConfirm = () => {
        if (cameFromHistoryRef.current) {
            navigate("/history", { replace: true });
            return;
        }
        setStep("RESULT");
    };

    const confirmRoute = () => setStep("SUCCESS");

    const goAlarmList = () => navigate("/history");

    // History에서 넘어온 confirm 처리
    useEffect(() => {
        if (!navState?.openConfirm || !navState.routeId) return;

        cameFromHistoryRef.current = navState.from === "history";

        setRoutes(ALARM_ROUTES_MOCK);

        const found = ALARM_ROUTES_MOCK.find((r) => r.id === navState.routeId) ?? null;
        if (found) {
            setSelectedRoute(found);
            setStep("CONFIRM");
        }

        navigate(".", { replace: true, state: null });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navState?.openConfirm, navState?.routeId]);

    return {
        // state
        step,
        isSearchOpen,
        searchTarget,
        origin,
        destination,
        routes,
        selectedRoute,

        // setters
        setIsSearchOpen,
        setSearchTarget,
        setStep,

        // actions
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
