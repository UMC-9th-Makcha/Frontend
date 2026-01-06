import { useEffect } from "react";
import { SettingAccount } from "./SettingAccount";
import { useSettingStore } from "../../store/useSettingStore";
import { SettingPlaces } from "./SettingPlace";
import { SettingNotification } from "./SettingNotification";
import type { SettingPanelProps } from "../../types/setting";
import Panel from "../../components/common/Panel";

export function SettingPanel({ view, data, onNavigate }: SettingPanelProps) {
  const { setHome, setFavorites } = useSettingStore();

  useEffect(() => {
    if (data.home) setHome(data.home);
    if (data.favorites) setFavorites(data.favorites);
  }, [data, setHome, setFavorites]);

  return (
    <Panel
      isMobileFull={view === 'MAIN'} 
    >
      <h1 className="mb-8 text-[26px] font-bold text-gray-900 dark:text-white px-1">
        환경설정
      </h1>

      <div className="flex flex-col gap-y-2">
        <SettingNotification />
        <SettingPlaces onNavigate={onNavigate} />
        <SettingAccount onNavigate={onNavigate} />
      </div>
    </Panel>
  );
}