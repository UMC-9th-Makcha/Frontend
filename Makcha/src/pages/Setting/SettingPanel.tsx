import { useEffect } from "react";
import { SettingAccount } from "./SettingAccount";
import { useSettingStore } from "../../store/useSettingStore";
import { SettingPlaces } from "./SettingPlace";
import { SettingNotification } from "./SettingNotification";
import type { SettingPanelProps } from "../../types/setting";

export function SettingPanel({ view, data, onNavigate }: SettingPanelProps) {
  const { setHome, setFavorites } = useSettingStore();

  useEffect(() => {
    if (data.home) setHome(data.home);
    if (data.favorites) setFavorites(data.favorites);
  }, [data, setHome, setFavorites]);

  return (
    <section 
      className={`
        ${view !== 'MAIN' ? 'hidden md:flex' : 'flex'} 
        h-full w-full flex-col border-r transition-all duration-300
        bg-white dark:bg-makcha-navy-900 
        border-gray-100 dark:border-white/5 
        md:w-[380px] md:shrink-0
      `}
    >
      <div className="no-scrollbar flex-1 overflow-y-auto px-[20px] pt-[30px] md:pt-[60px]">
        <h1 className="hidden mb-8 text-[26px] font-bold text-gray-900 dark:text-white px-1">
          환경설정
        </h1>

        <div className="flex flex-col gap-y-2">
          <SettingNotification />
          <SettingPlaces onNavigate={onNavigate} />
          <SettingAccount onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  );
}