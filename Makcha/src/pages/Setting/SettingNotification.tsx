import { TIMES } from "./constants";
import { useSettingStore } from "../../store/useSettingStore";
import { HorizontalScroll } from "../../components/common/HorizontalScroll";

export function SettingNotification() {
  const { selectedTimes, toggleTime } = useSettingStore();

  return (
    <div className="mb-10 px-1">
      <p className="mb-4 text-[18px] font-semibold dark:text-white">알림</p>

      <HorizontalScroll
        items={TIMES}
        renderItem={(t) => {
          const isSelected = selectedTimes.includes(t);
          return (
            <button
              className={`
                rounded-full border px-5 py-2 text-[14px] transition-colors duration-200 pointer-events-none
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 font-bold text-blue-600 dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-400' 
                  : 'border-gray-300 text-gray-500 hover:border-gray-400 dark:border-white/10 dark:text-makcha-navy-300'
                }
              `}
            >
              {t}
            </button>
          );
        }}
        onItemClick={(t, moved) => toggleTime(t, moved)}
      />
    </div>
  );
}