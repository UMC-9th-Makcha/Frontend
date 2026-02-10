import type { WaitingSpotLayoutProps } from "../types/waitingspot";
import Panel from "../../../components/common/Panel";
import SubPanel from "../../../components/common/Panel/SubPanel";
import { MobileBottomSheet } from "../common/MobileBottomSheet";

export const WaitingSpotLayout = ({header, controls, map, search, list, detail, footer, onDetailBack} : WaitingSpotLayoutProps) => {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <div className="absolute inset-0 z-0">{map}</div>

      <div className="relative h-full pointer-events-none md:flex md:items-center">
        <Panel
          width="md:w-100"
          isMobileFull
          disablePadding
          className="md:pointer-events-auto !bg-transparent md:!bg-white"
        >
          <div className="hidden md:flex h-full flex-col px-4 pt-10">
            {header}
            {search}
            {controls}
            {list}
          </div>

          <MobileBottomSheet
            title="첫차 대기 장소"
            top={
              <>
                {search}
                {controls}
              </>
            }>
            {list}
          </MobileBottomSheet>
        </Panel>

        <SubPanel
          isOpen={!!detail}
          onBack={onDetailBack}
          title="상세 정보"
          width="md:w-100"
          className="pointer-events-auto"
          footer={footer}
        >
          {detail}
        </SubPanel>
      </div>
    </div>
  );
};
