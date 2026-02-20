import type { WaitingSpotLayoutProps } from "../types/waitingspot";
import Panel from "../../../components/common/Panel";
import SubPanel from "../../../components/common/Panel/SubPanel";
import { MobileBottomSheet } from "../common/MobileBottomSheet";

export const WaitingSpotLayout = ({
  header, controls, map, search, list, detail, footer, onDetailBack
}: WaitingSpotLayoutProps) => {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {/* 지도 */}
      <div className="absolute inset-0 z-0">{map}</div>


      <div className="absolute inset-0 z-60 pointer-events-none flex flex-col md:flex-row md:items-center">
        
        {/* PC에서만 보임 */}
        <Panel
          width="md:w-[400px]"
          isMobileFull={false}
          className="hidden md:flex pointer-events-auto h-full"
        >
           <div className="flex flex-col h-full">
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
          className="pb-12 md:pb-0 pointer-events-auto"
          footer={footer}
        >
          {detail}
        </SubPanel>

      </div>

      {/* 모바일용 바텀시트 */}
      {!detail && (
        <div className="md:hidden absolute inset-0 z-20 pointer-events-none">
          <MobileBottomSheet
            title="첫차 대기 장소"
            top={
              <div className="pointer-events-auto">
                 {search}
                 {controls}
              </div>
            }
          >
            {list}
          </MobileBottomSheet>
        </div>
      )}
    </div>
  );
};