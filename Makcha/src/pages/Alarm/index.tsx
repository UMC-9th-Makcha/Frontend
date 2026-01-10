import { useState } from "react";
import RouteLoadingPanel from "./RouteLoadingPanel";
import RouteResultPanel from "./RouteResultPanel";
import { ALARM_ROUTES_MOCK } from "./mocks/alarmMock";
import type { OriginSearchItem } from "./types/search";
import AlarmPanel from "./AlarmPanel";
import AlarmSuccessPanel from "./AlarmSuccessPanel";
import SearchSheet from "./SearchSheet";
import type { AlarmRoute } from "./types/alarm";
import RouteConfirmPanel from "./RouteConfirmPanel";
import type { RouteConfirmDetail } from "./types/routeConfirm";
import { ROUTE_CONFIRM_DETAIL_MOCK } from "./mocks/routeConfirmMock";

type Step = "INPUT" | "LOADING" | "RESULT" | "CONFIRM" | "SUCCESS";
type SearchTarget = "ORIGIN" | "DESTINATION";

const Alarm = () => {
    const [step, setStep] = useState<Step>("INPUT");

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTarget, setSearchTarget] = useState<SearchTarget>("ORIGIN");

    const [origin, setOrigin] = useState<OriginSearchItem | null>(null);
    const [destination, setDestination] = useState<OriginSearchItem | null>(null);

    const [routes, setRoutes] = useState<AlarmRoute[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<AlarmRoute | null>(null);

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

    return (
        <div className="min-h-dvh w-full overflow-hidden bg-white dark:bg-makcha-navy-900">
            <div className="relative h-dvh w-full md:flex md:overflow-hidden">
                <div className="w-full md:w-[402px] md:shrink-0">
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
                            onBack={() => setStep("RESULT")}
                            onConfirm={() => setStep("SUCCESS")}
                        />
                    ) : step === "SUCCESS" && origin && destination && selectedRoute ? (
                        <AlarmSuccessPanel
                            origin={origin}
                            destination={destination}
                            route={selectedRoute}
                            onGoAlarmList={() => {
                                // TODO : 알림내역 이동
                            }}
                        />
                    ) : (
                        <AlarmPanel
                            onOpenOrigin={openOriginSheet}
                            onOpenDestination={openDestinationSheet}
                            onSelectDestination={(item) => {
                                setSearchTarget("DESTINATION");
                                handleSelect("DESTINATION", item);
                            }}
                        />
                    )}
                </div>

                {/* 지도 */}
                {step !== "CONFIRM" && (
                    <section className="hidden md:block min-w-0 flex-1 h-dvh bg-gray-100" />
                )}

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
