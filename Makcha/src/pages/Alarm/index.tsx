import { useState } from "react";
import AlarmPanel from "./components/AlarmPanel";
import OriginSearchSheet from "./components/OriginSearchSheet";

const Alarm = () => {
  const [isOriginOpen, setIsOriginOpen] = useState(false);

  return (
    <div className="-m-4 md:-m-8 h-[calc(100vh)] overflow-hidden">
      <div className="relative flex h-full w-full overflow-hidden">
        {/* 알람 설정 패널 */}
        <AlarmPanel onOpenOrigin={() => setIsOriginOpen(true)} />

        {/* 지도 */}
        <section className="min-w-0 flex-1 bg-gray-100" />

        {/* 출발지 검색창 */}
        <OriginSearchSheet
          open={isOriginOpen}
          onClose={() => setIsOriginOpen(false)}
        />
      </div>
    </div>
  );
};

export default Alarm;