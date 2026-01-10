import type { WaitingSpotLayoutProps } from "../../types/waitingspot"
import Panel from "../common/Panel";

export const WalkingDirectionLayout = ({header, controls, map, search, list, detail, footer}: WaitingSpotLayoutProps) => {
  return (
    <div className="relative h-dvh w-full">
      {/* map */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full hidden md:block">{map}</div>
      </div>

      <Panel
        width="md:w-100"
        isMobileFull={true}
        className="relative inset-x-0 z-10 bg-white dark:bg-makcha-navy-900 md:relative md:top-0 md:h-dvh md:shadow-[5px_0px_15px_0px_#88888859]"
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

      {detail && (
        <div className="absolute top-1/2 -translate-y-1/2 left-full ml-6">
          {detail}
        </div>
      )}
    </div>
  );
};
