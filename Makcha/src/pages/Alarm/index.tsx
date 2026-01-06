import { useState } from "react";
import RouteLoadingPanel from "./RouteLoadingPanel";
import RouteResultPanel from "./RouteResultPanel";
import type { AlarmRoute } from "./mocks/alarmMock";
import { ALARM_ROUTES_MOCK } from "./mocks/alarmMock";
import type { OriginSearchItem } from "./mocks/originSearchMock";
import AlarmPanel from "./AlarmPanel";
import OriginSearchSheet from "./OriginSearchSheet";
import AlarmSuccessPanel from "./AlarmSuccessPanel";
import DestinationSearchSheet from "./DestinationSearchSheet";

type Step = "INPUT" | "LOADING" | "RESULT" | "SUCCESS";

const Alarm = () => {
    const [step, setStep] = useState<Step>("INPUT");

    const [isOriginOpen, setIsOriginOpen] = useState(false);
    const [isDestinationOpen, setIsDestinationOpen] = useState(false);

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

    const handleSelectOrigin = (item: OriginSearchItem) => {
        setOrigin(item);
        setIsOriginOpen(false);

        if (destination) startRouteSearch();
    };

    const handleSelectDestination = (item: OriginSearchItem) => {
        setDestination(item);
        setIsDestinationOpen(false);

        if (origin) {
            startRouteSearch();
        } else {
            setIsOriginOpen(true);
        }
    };

    const handleSelectRoute = (route: AlarmRoute) => {
        setSelectedRoute(route);
        setStep("SUCCESS");
    };

    return (
        <div className="min-h-dvh w-full overflow-hidden bg-white dark:bg-makcha-navy-900">
            <div className="relative h-dvh w-full md:flex md:overflow-hidden">
                <div className="w-full md:w-[402px] md:shrink-0">
                    {step === "LOADING" ? (
                        <RouteLoadingPanel open />
                    ) : step === "RESULT" ? (
                        <RouteResultPanel
                            origin={origin}
                            destination={destination}
                            routes={routes}
                            onSelectRoute={handleSelectRoute}
                        />
                    ) : step === "SUCCESS" ? (
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
                            onOpenOrigin={() => setIsOriginOpen(true)}
                            onOpenDestination={() => setIsDestinationOpen(true)}
                            onSelectDestination={handleSelectDestination}
                        />
                    )}
                </div>

                {/* 지도: md 이상에서만 표시 */}
                <section className="hidden md:block min-w-0 flex-1 h-dvh bg-gray-100" />

                {/* PC */}
                <div className="hidden md:block">
                    <OriginSearchSheet
                        open={isOriginOpen}
                        onClose={() => setIsOriginOpen(false)}
                        onSelectOrigin={handleSelectOrigin}
                    />
                </div>

                <div className="hidden md:block">
                    <DestinationSearchSheet
                        open={isDestinationOpen}
                        onClose={() => setIsDestinationOpen(false)}
                        onSelectDestination={handleSelectDestination}
                    />
                </div>

                {/* Mobile*/}
                {isOriginOpen && (
                    <div className="md:hidden">
                        <OriginSearchSheet
                            open
                            onClose={() => setIsOriginOpen(false)}
                            onSelectOrigin={handleSelectOrigin}
                        />
                    </div>
                )}

                {isDestinationOpen && (
                    <div className="md:hidden">
                        <DestinationSearchSheet
                            open
                            onClose={() => setIsDestinationOpen(false)}
                            onSelectDestination={handleSelectDestination}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alarm;