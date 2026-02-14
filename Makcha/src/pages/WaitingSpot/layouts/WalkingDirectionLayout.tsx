import type { WaitingSpotLayoutProps } from "../types/waitingspot";
import Panel from "../../../components/common/Panel";
import SubPanel from "../../../components/common/Panel/SubPanel";
import { MobileBottomSheet } from "../common/MobileBottomSheet";

export const WalkingDirectionLayout = ({ header, controls, map, search, list, detail, footer, onDetailBack }: WaitingSpotLayoutProps) => {
  return (
    <div className="relative h-dvh w-full">
      {/* map */}
      <div className="absolute inset-0 z-0">
        {map}
      </div>

      <div className="relative z-10 h-full w-full pointer-events-none md:flex md:items-center">
        <Panel
          width="md:w-100"
          isMobileFull={true}
          className={`pointer-events-auto h-full ${detail ? "hidden md:flex" : "md:flex"}`}
          disablePadding
          contentClassName="h-full min-h-0 flex flex-col"
        >
          <div
            className="flex-1 min-h-0 overflow-y-auto px-[16px] pt-[40px] pb-6">
            {header}
            {search}
            {controls}
            {list}
          </div>

          {footer && (
            <div className="shrink-0 px-[16px]">
              {footer}
            </div>
          )}
        </Panel>

        <SubPanel
          isOpen={!!detail}
          onBack={onDetailBack}
          title="경로 안내"
          width="md:w-100"
          className="hidden md:flex pointer-events-auto"
        >
          {detail}
        </SubPanel>

      </div>
      { detail && (
        <div className={`md:hidden absolute inset-0 z-20 pointer-events-none`}>
          <MobileBottomSheet title="도보 길 안내">
            {detail}
          </MobileBottomSheet>
        </div>
      )}
    </div>
  );
};
