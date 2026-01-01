import { useState } from "react";
import AlarmPanel from "./components/AlarmPanel";
import OriginSearchSheet from "./components/OriginSearchSheet";
import RouteLoadingPanel from "./components/RouteLoadingPanel";
import RouteResultPanel from "./components/RouteResultPanel";
import AlarmSuccessPanel from "./components/AlarmSuccessPanel";
import type { OriginSearchItem } from "./mocks/originSearchMock";
import type { AlarmRoute } from "./mocks/alarmMock";
import { ALARM_ROUTES_MOCK } from "./mocks/alarmMock"; 

type Step = "INPUT" | "LOADING" | "RESULT" | "SUCCESS";

const Alarm = () => {
  const [step, setStep] = useState<Step>("INPUT");

  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [origin, setOrigin] = useState<OriginSearchItem | null>(null);
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

  const handleSelectRoute = (route: AlarmRoute) => {
    setSelectedRoute(route);
    setStep("SUCCESS");
  };

  return (
    <div className="-m-4 md:-m-8 h-[calc(100vh)] overflow-hidden">
      <div className="relative flex h-full w-full overflow-hidden">
        {/* 좌측 패널 */}
        {step === "LOADING" ? (
          <RouteLoadingPanel open />
        ) : step === "RESULT" ? (
          <RouteResultPanel
            origin={origin}
            routes={routes}
            onSelectRoute={handleSelectRoute}
          />
        ) : step === "SUCCESS" ? (
          <AlarmSuccessPanel
                origin={origin}
                route={selectedRoute}
                onGoAlarmList={() => {
                  // TODO
                  console.log("알림 내역 조회하기");
                } } destination={null}          />
        ) : (
          <AlarmPanel onOpenOrigin={() => setIsOriginOpen(true)} />
        )}

        {/* 지도 */}
        <section className="min-w-0 flex-1 bg-gray-100" />

        {/* 출발지 검색창 */}
        <OriginSearchSheet
          open={isOriginOpen}
          onClose={() => setIsOriginOpen(false)}
          onSelectOrigin={handleSelectOrigin}
        />
      </div>
    </div>
  );
};

export default Alarm;