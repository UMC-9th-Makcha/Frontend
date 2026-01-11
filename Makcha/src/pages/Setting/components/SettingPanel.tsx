import { memo } from "react";
import { AccountSection } from "./AccountSection";
import Panel from "../../../components/common/Panel";
import { AlramSection } from "./AlramSection";
import type { SettingPanelProps } from "../../../types/setting";
import { PlacesSection } from "./PlaceSection";
import PolicyLinks from "../../../components/common/PolicyLinks";

export const SettingPanel = memo(function SettingPanel({ view, onNavigate }: SettingPanelProps) {
  return (
    <Panel isMobileFull={view === 'MAIN'}>
      <h1 className="mb-8 text-[26px] font-bold text-gray-900 dark:text-white px-1">
        환경설정
      </h1>

      <div className="flex flex-col gap-y-2">
        {/* 알림 설정 */}
        <AlramSection />
        
        {/* 장소 설정 */}
        <PlacesSection onNavigate={onNavigate} />
        
        {/* 계정 설정 */}
        <AccountSection onNavigate={onNavigate} />
      </div>

      <div className="mt-12 pb-4"> 
          <PolicyLinks />
      </div>
    </Panel>
  );
});