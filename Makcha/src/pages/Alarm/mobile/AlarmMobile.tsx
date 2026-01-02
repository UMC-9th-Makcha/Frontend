import { useState } from "react";
import AlarmPanel from "./AlarmPanel";
import OriginSearchSheet from "../mobile/OriginSearchSheet";
import RouteLoadingPanel from "../mobile/RouteLoadingPanel";
import RouteResultPanel from "../mobile/RouteResultPanel";   
import type { OriginSearchItem } from "../mocks/originSearchMock";
import type { AlarmRoute } from "../mocks/alarmMock";
import { ALARM_ROUTES_MOCK } from "../mocks/alarmMock";

type Step = "INPUT" | "LOADING" | "RESULT";

const AlarmMobile = () => {
    const [step, setStep] = useState<Step>("INPUT");
    const [isOriginOpen, setIsOriginOpen] = useState(false);
    const [origin, setOrigin] = useState<OriginSearchItem | null>(null);
    const [routes, setRoutes] = useState<AlarmRoute[]>([]);

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
        <div className="min-h-dvh w-full bg-[#F8FAFF] dark:bg-makcha-navy-950 overflow-x-hidden">
            {step === "LOADING" ? (
                <RouteLoadingPanel open />
            ) : step === "RESULT" ? (
                <RouteResultPanel
                        origin={origin}
                        routes={routes}
                        onSelectRoute={(route) => {
                            console.log("선택된 route:", route);
                            // TODO
                        } } isOpen={false} setIsOpen={function (): void {
                            throw new Error("Function not implemented.");
                        } }                />
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
