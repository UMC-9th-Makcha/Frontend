import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AlarmPanel from "./AlarmPanel";
import RouteLoadingPanel from "./RouteLoadingPanel";
import RouteResultPanel from "./RouteResultPanel";
import RouteConfirmPanel from "./RouteConfirmPanel";
import AlarmSuccessPanel from "./AlarmSuccessPanel";
import SearchSheet from "./SearchSheet";

import { ALARM_ROUTES_MOCK } from "./mocks/alarmMock";
import { ROUTE_CONFIRM_DETAIL_MOCK } from "./mocks/routeConfirmMock";

import type { OriginSearchItem } from "./types/search";
import type { AlarmRoute } from "./types/alarm";
import type { RouteConfirmDetail } from "./types/routeConfirm";

import Panel from "../../components/common/Panel";
import KakaoMapView from "./KakaoMapView";

type Step = "INPUT" | "LOADING" | "RESULT" | "CONFIRM" | "SUCCESS";
type SearchTarget = "ORIGIN" | "DESTINATION";

type NavState = {
    from?: "history";
    openConfirm?: boolean;
    routeId?: string;
};

const Alarm = () => {
    useEffect(() => {
        console.log("KAKAO KEY:", import.meta.env.VITE_KAKAO_JS_KEY);
    }, []);

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
            setRoutes(ALARM_ROUTES_MOCK);
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

    const handleSelectRoute = (route: AlarmRoute) => {
        setSelectedRoute(route);
        setStep("CONFIRM");
    };

    const getConfirmDetail = (routeId: string): RouteConfirmDetail => {
        return (
            ROUTE_CONFIRM_DETAIL_MOCK[routeId] ?? {
                etaText: "도착 정보 없음",
                segments: [],
            }
        );
    };

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

    return (
        <div className="h-dvh w-full overflow-x-hidden bg-white dark:bg-makcha-navy-900">
            <div className="relative h-dvh w-full md:flex md:overflow-hidden">
                {/* 좌측 패널 */}
                <Panel
                    width="md:w-100"
                    isMobileFull
                    className="md:border-r md:border-gray-200 dark:md:border-makcha-navy-800"
                    disablePadding={step === "CONFIRM"}
                >
                    {step === "LOADING" ? (
                        <RouteLoadingPanel open />
                    ) : step === "RESULT" && origin && destination ? (
                        <RouteResultPanel
                            origin={origin}
                            destination={destination}
                            routes={routes}
                            onSelectRoute={handleSelectRoute}
                        />
                    ) : step === "CONFIRM" && selectedRoute ? (
                        <RouteConfirmPanel
                            route={selectedRoute}
                            detail={getConfirmDetail(selectedRoute.id)}
                            onBack={() => {
                                // History에서 넘어온 CONFIRM이면 History로 
                                if (cameFromHistoryRef.current) {
                                    navigate("/history", { replace: true });
                                    return;
                                }
                                setStep("RESULT");
                            }}
                            onConfirm={() => setStep("SUCCESS")}
                        />
                    ) : step === "SUCCESS" && origin && destination && selectedRoute ? (
                        <AlarmSuccessPanel
                            origin={origin}
                            destination={destination}
                            route={selectedRoute}
                            onGoAlarmList={() => {
                                navigate("/history");
                            }}
                        />
                    ) : (
                        <AlarmPanel
                            origin={origin}
                            destination={destination}
                            onOpenOrigin={openOriginSheet}
                            onOpenDestination={openDestinationSheet}
                            onSelectDestination={(item) => {
                                setSearchTarget("DESTINATION");
                                handleSelect("DESTINATION", item);
                            }}
                        />
                    )}
                </Panel>

                {/* 지도 영역 */}
                <section className="hidden md:block min-w-0 flex-1 h-dvh">
                    <KakaoMapView />
                </section>

                {/* 검색 시트 */}
                <SearchSheet
                    open={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                    title={searchTarget === "ORIGIN" ? "출발지" : "도착지"}
                    onSelect={(item) => handleSelect(searchTarget, item)}
                />
            </div>
        </div>
    );
};

export default Alarm;
