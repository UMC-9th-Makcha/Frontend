import { memo } from "react";
import { SettingAccount } from "./SettingAccount";
import { SettingPlaces } from "./SettingPlace";
import { SettingNotification } from "./SettingNotification";
import Panel from "../../../components/common/Panel";
import type { ViewType } from "../constants";
import type { Place } from "../../../types/setting";

interface SettingPanelProps {
  view: ViewType;
  onNavigate: (v: ViewType, p?: Place) => void;
}

export const SettingPanel = memo(function SettingPanel({ view, onNavigate }: SettingPanelProps) {
  return (
    <Panel isMobileFull={view === 'MAIN'}>
      <h1 className="mb-8 text-[26px] font-bold text-gray-900 dark:text-white px-1">
        환경설정
      </h1>

      <div className="flex flex-col gap-y-2">
        {/* 알림 설정 */}
        <SettingNotification />
        
        {/* 장소 설정 */}
        <SettingPlaces onNavigate={onNavigate} />
        
        {/* 계정 설정 */}
        <SettingAccount onNavigate={onNavigate} />
      </div>
    </Panel>
  );
});