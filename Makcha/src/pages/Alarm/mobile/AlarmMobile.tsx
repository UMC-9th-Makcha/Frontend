import { useState } from "react";
import AlarmPanel from "./AlarmPanel";
import OriginSearchSheet from "./OriginSearchSheet";
import DestinationSearchSheet from "./DestinationSearchSheet";
import RouteLoadingPanel from "./RouteLoadingPanel";
import RouteResultPanelMobile from "./RouteResultPanel";
import AlarmSuccessPanel from "./AlarmSuccessPanel";

import type { OriginSearchItem } from "../mocks/originSearchMock";
import type { AlarmRoute } from "../mocks/alarmMock";
import { ALARM_ROUTES_MOCK } from "../mocks/alarmMock";

type Step = "INPUT" | "LOADING" | "RESULT" | "SUCCESS";

const AlarmMobile = () => {
    const [step, setStep] = useState<Step>("INPUT");
    const [isOriginOpen, setIsOriginOpen] = useState(false);
    const [isDestinationOpen, setIsDestinationOpen] = useState(false);

    const [origin, setOrigin] = useState<OriginSearchItem | null>(null);
    const [destination, setDestination] = useState<OriginSearchItem | null>(null);

    const [routes, setRoutes] = useState<AlarmRoute[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<AlarmRoute | null>(null);

    // 출발지+도착지 모두 선택
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

        // 도착지가 이미 선택되어 있으면 로딩창 띄우기
        if (destination) {
            startRouteSearch();
        }
    };

    const handleSelectDestination = (item: OriginSearchItem) => {
        setDestination(item);
        setIsDestinationOpen(false);

        // 출발지가 이미 선택되어 있으면 경로 탐색 시작
        // 출발지가 없으면 출발지 선택을 유도
        if (origin) {
            startRouteSearch();
        } else {
            setIsOriginOpen(true); // 출발지 창 띄우기
        }
    };

    return (
        <div className="h-dvh w-full bg-white dark:bg-makcha-navy-900 overflow-x-hidden">
            {step === "LOADING" ? (
                <RouteLoadingPanel open />
            ) : step === "RESULT" ? (
                <RouteResultPanelMobile
                    origin={origin}
                    destination={destination}
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

            {isOriginOpen && (
                <OriginSearchSheet
                    open
                    onClose={() => setIsOriginOpen(false)}
                    onSelectOrigin={handleSelectOrigin}
                />
            )}

            {isDestinationOpen && (
                <DestinationSearchSheet
                    open
                    onClose={() => setIsDestinationOpen(false)}
                    onSelectDestination={handleSelectDestination}
                />
            )}
        </div>
    );
};

export default AlarmMobile;
