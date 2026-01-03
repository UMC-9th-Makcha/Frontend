import { useState } from "react";
import AlarmPanel from "./AlarmPanel";
import OriginSearchSheet from "../mobile/OriginSearchSheet";
import RouteLoadingPanel from "../mobile/RouteLoadingPanel";
import RouteResultPanelMobile from "../mobile/RouteResultPanel";
import AlarmSuccessPanel from "../mobile/AlarmSuccessPanel";

import type { OriginSearchItem } from "../mocks/originSearchMock";
import type { AlarmRoute } from "../mocks/alarmMock";
import { ALARM_ROUTES_MOCK } from "../mocks/alarmMock";

type Step = "INPUT" | "LOADING" | "RESULT" | "SUCCESS";

const AlarmMobile = () => {
    const [step, setStep] = useState<Step>("INPUT");
    const [isOriginOpen, setIsOriginOpen] = useState(false);

    const [origin, setOrigin] = useState<OriginSearchItem | null>(null);
    const [destination, setDestination] = useState<OriginSearchItem | null>(null);
    const [routes, setRoutes] = useState<AlarmRoute[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<AlarmRoute | null>(null); 

    const handleSelectOrigin = (item: OriginSearchItem) => {
        setOrigin(item);
        setIsOriginOpen(false);

        setStep("LOADING");
        window.setTimeout(() => {
            setRoutes(ALARM_ROUTES_MOCK);
            setStep("RESULT");
        }, 1200);
    };

    return (
        <div className="h-dvh w-full bg-white dark:bg-makcha-navy-900 overflow-x-hidden">
            {step === "LOADING" ? (
                <RouteLoadingPanel open />
            ) : step === "RESULT" ? (
                <RouteResultPanelMobile
                    origin={origin}
                    routes={routes}
                    onSelectRoute={(route) => {
                        setSelectedRoute(route);
                        setStep("SUCCESS");
                    }}
                />
            ) : step === "SUCCESS" ? (
                <AlarmSuccessPanel
                    origin={origin}
                    destination={destination}
                    route={selectedRoute}
                    onGoAlarmList={() => {

                        setStep("INPUT");
                    }}
                />
            ) : (
                <AlarmPanel onOpenOrigin={() => setIsOriginOpen(true)} />
            )}

            {isOriginOpen && (
                <OriginSearchSheet
                    open
                    onClose={() => setIsOriginOpen(false)}
                    onSelectOrigin={handleSelectOrigin}
                />
            )}
        </div>
    );
};

export default AlarmMobile;