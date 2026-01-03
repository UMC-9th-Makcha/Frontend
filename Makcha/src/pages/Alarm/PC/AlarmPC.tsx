import { useState } from "react";
import AlarmPanel from "./AlarmPanel";
import OriginSearchSheet from "./OriginSearchSheet";
import RouteLoadingPanel from "./RouteLoadingPanel";
import RouteResultPanel from "./RouteResultPanel";
import AlarmSuccessPanel from "./AlarmSuccessPanel";
import type { OriginSearchItem } from "../mocks/originSearchMock";
import type { AlarmRoute } from "../mocks/alarmMock";
import { ALARM_ROUTES_MOCK } from "../mocks/alarmMock";

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
    <div className="min-h-dvh w-full overflow-hidden">
      <div className="relative h-dvh w-full md:flex md:overflow-hidden">
        <div className="w-full md:w-[402px] md:shrink-0">
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
              destination={null}
              route={selectedRoute}
              onGoAlarmList={() => {
                console.log("알림 내역 조회하기");
              }}
            />
          ) : (
            <AlarmPanel onOpenOrigin={() => setIsOriginOpen(true)} />
          )}
        </div>

        {/* 지도: md 이상에서만 */}
        <section className="hidden md:block min-w-0 flex-1 h-dvh bg-gray-100" />

        {/* 출발지 검색창 */}
        <div className="hidden md:block">
          <OriginSearchSheet
            open={isOriginOpen}
            onClose={() => setIsOriginOpen(false)}
            onSelectOrigin={handleSelectOrigin}
          />
        </div>
      </div>
    </div>
  );
};

export default Alarm;




