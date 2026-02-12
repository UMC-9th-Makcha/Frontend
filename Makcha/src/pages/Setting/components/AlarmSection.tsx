import { useCallback } from "react";
import { HorizontalScroll } from "../../../components/common/HorizontalScroll";
import { TIME_LABELS } from "../constants";
import { useAlarmSetting } from "../hooks/useAlarmSetting";

export function AlarmSection() {
  const { selectedTimes, toggleTime } = useAlarmSetting();

  const handleItemClick = useCallback((t: string, moved: boolean) => {
    if (moved) return;
    toggleTime(t);
  }, [toggleTime]);

  return (
    <div className="mb-10 px-1">
      <p className="mb-3 text-h2 font-semibold dark:text-white">알림</p>
      
      <HorizontalScroll
        items={TIME_LABELS}
        renderItem={(t) => {
          const isSelected = selectedTimes.includes(t);
          
          return (
            <div
              className={`
                cursor-pointer rounded-full border transition-all duration-200 select-none text-body
                px-4 py-2
                ${isSelected 
                  ? 'border-makcha-navy-600 text-makcha-navy-600 dark:text-makcha-navy-200 bg-makcha-navy-200/40 dark:border-makcha-navy-400 dark:bg-makcha-navy-600' 
                  : 'border-gray-200 text-gray-400 dark:border-white/10 dark:text-makcha-navy-300'
                }
              `}
            >

              <span className="relative block text-center">

                <span className={`block ${isSelected ? 'font-bold' : 'font-medium'}`}>
                    {t}
                </span>

                <span className="invisible font-bold h-0 block overflow-hidden pointer-events-none" aria-hidden="true">
                    {t}
                </span>
              </span>
            </div>
          );
        }}
        onItemClick={handleItemClick}
      />
    </div>
  );
}