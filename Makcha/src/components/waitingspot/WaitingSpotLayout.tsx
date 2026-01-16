import type { WaitingSpotLayoutProps } from "../../types/waitingspot"
import Panel from "../common/Panel"
import SubPanel from "../common/Panel/SubPanel";

export const WaitingSpotLayout = ({header, controls, map, search, list, detail, onDetailBack} : WaitingSpotLayoutProps) => {
  return (
    <div className="relative h-dvh w-full">
      {/* map */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full">{map}</div>
      </div>

      <div className="relative z-10 h-full w-full pointer-events-none md:flex">
        <Panel
          width="md:w-100"
          isMobileFull
          className="pointer-events-auto md:shadow-[5px_0px_15px_0px_#88888859]"
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
          onBack={onDetailBack}
          title="상세 정보"
          width="md:w-100"
          className="pointer-events-auto"
        >
          {detail}
        </SubPanel>
      </div>
    </div>
  );
};
