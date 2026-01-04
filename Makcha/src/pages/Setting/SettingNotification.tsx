import { TIMES } from "./constants";
import { useDragScroll } from "../../hooks/useDragScroll";
import { useSettingStore } from "../../store/useSettingStore";

export function SettingNotification() {
  const { scrollerRef, indicator, onMouseDown, onScroll, isDragging, dragMoved } = useDragScroll();
  const { selectedTimes, toggleTime } = useSettingStore();

  return (
    <div className="mb-10 px-1">
      <p className="mb-4 text-[18px] font-semibold dark:text-white">알림</p>
      <div className="relative">
        <div 
          ref={scrollerRef} 
          onMouseDown={onMouseDown} 
          onScroll={onScroll} 
          className={`no-scrollbar flex gap-2 overflow-x-auto pb-3 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {TIMES.map(t => {
            const isSelected = selectedTimes.includes(t);
            return (
              <button 
                key={t} 
                onClick={() => toggleTime(t, dragMoved)} 
                className={`
                  shrink-0 rounded-full border px-5 py-2 text-[14px] transition-all
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50 font-bold text-blue-600 dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-400' 
                    : 'border-gray-300 text-gray-500 hover:border-gray-400 dark:border-white/10 dark:text-makcha-navy-300'
                  }
                `}
              >
                {t}
              </button>
            );
          })}
          <div className=" shrink-0" />
        </div>

        {/* 하단 스크롤 */}
        <div className="relative h-[2px] w-full bg-gray-100 dark:bg-white/5">
          <div 
            className="absolute h-[2px] bg-blue-500 transition-all dark:bg-blue-400" 
            style={{ left: indicator.left, width: indicator.width }} 
          />
        </div>
      </div>
    </div>
  );
}