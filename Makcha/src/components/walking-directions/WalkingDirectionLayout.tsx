import type { WaitingSpotLayoutProps } from "../../types/waitingspot"
import Panel from "../common/Panel";
import SubPanel from "../common/Panel/SubPanel";

export const WalkingDirectionLayout = ({header, controls, map, search, list, detail, footer, onDetailBack}: WaitingSpotLayoutProps) => {
  return (
    <div className="relative h-dvh w-full">
      {/* map */}
      <div className="absolute inset-0">
        {map}
      </div>

      <div className="relative z-10 h-full w-full pointer-events-none md:flex md:items-center">
        <Panel
          width="md:w-100"
          isMobileFull={true}
          className="relative inset-x-0 z-10 bg-white pointer-events-auto dark:bg-makcha-navy-900 md:relative md:top-0 md:h-dvh md:shadow-[5px_0px_15px_0px_#88888859]"
        >
          <div className="min-h-full flex flex-col">
            <div className="flex-1 min-h-0">
              {header}
              {search}
              {controls}
              {list}
            </div>
          </div>
          {footer && (
            <div className="mt-auto mb-20">
              {footer}
            </div>
          )}
        </Panel>
        <SubPanel
          isOpen={!!detail}
          onBack={onDetailBack}
          title="경로 안내"
          width="md:w-100"
          className="pointer-events-auto"
        >
          {detail}
        </SubPanel>
      </div>
    </div>
  );
};
