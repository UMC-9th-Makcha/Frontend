import type { WaitingSpotLayoutProps } from "../../../types/waitingspot"
import Panel from "../../common/Panel"
import SubPanel from "../../common/Panel/SubPanel";

export const WaitingSpotLayout = ({header, controls, map, search, list, detail} : WaitingSpotLayoutProps) => {
  return (
    <div className="relative h-dvh w-full">
      {/* map */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full hidden md:block">{map}</div>
      </div>

      <div className="relative z-10 h-full w-full md:flex">
        <Panel
          width="md:w-100"
          isMobileFull
          className="md:shadow-[5px_0px_15px_0px_#88888859]"
        >
          <div className="flex flex-col gap-0">
            {header}
            {search}
            {controls}
            {list}
          </div>
        </Panel>

        <SubPanel
          isOpen={!!detail}
          onBack={() => {
            // ⚠️ 여기서 닫히게 하려면 상태를 받아야 함.
            // 지금은 detail 컴포넌트 내부(X버튼 onClose)로 닫는 방식만 가능.
          }}
          title="상세 정보"
          width="md:w-100"
        >
          {detail}
        </SubPanel>
      </div>
    </div>
  );
};
