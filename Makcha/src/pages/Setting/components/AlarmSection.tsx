import { useEffect, useCallback } from "react";
import { HorizontalScroll } from "../../../components/common/HorizontalScroll";
import { TIME_LABELS } from "../constants"; // TIME_LABELS가 있는 경로
import { useAlarmStore } from "../../../store/useAlarmStore";

export function AlarmSection() {
  const selectedTimes = useAlarmStore((state) => state.selectedTimes);
  const toggleTime = useAlarmStore((state) => state.toggleTime);
  const fetchSettings = useAlarmStore((state) => state.fetchSettings);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleItemClick = useCallback((t: string, moved: boolean) => {
    if (moved) return;
    toggleTime(t);
  }, [toggleTime]);

  return (
    <div className="mb-10 px-1">
      <p className="mb-4 text-[18px] font-semibold dark:text-white">알림</p>
      <HorizontalScroll
        items={TIME_LABELS}
        renderItem={(t) => {
          const isSelected = selectedTimes.includes(t);
          return (
            <div
              className={`
                cursor-pointer 
                rounded-full border px-5 py-2 text-[14px] transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 font-bold text-blue-600 dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-400' 
                  : 'border-gray-300 text-gray-500 dark:border-white/10 dark:text-makcha-navy-300'
                }
              `}
            >
              {t}
            </div>
          );
        }}
        onItemClick={handleItemClick}
      />
    </div>
  );
}