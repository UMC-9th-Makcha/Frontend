import { TIMES } from "./constants";
import { useDragScroll } from "../../hooks/useDragScroll";
import { useSettingStore } from "../../store/useSettingStore";

export function SettingNotification() {
  const { scrollerRef, indicatorRef, onScroll, getDragMoved } = useDragScroll();
  const { selectedTimes, toggleTime } = useSettingStore();

  return (
    <div className="mb-10 px-1">
      <p className="mb-4 text-[18px] font-semibold dark:text-white">알림</p>
      <div className="relative">
        <div 
          ref={scrollerRef} 
          onScroll={onScroll} 
          className="no-scrollbar flex gap-2 overflow-x-auto pb-3 cursor-grab"
          style={{ 
            /* 가로(pan-x)와 세로(pan-y) 스크롤을 모두 브라우저 네이티브로 허용 */
            touchAction: 'pan-x pan-y',
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {TIMES.map((t) => (
            <button 
              key={t} 
              onClick={() => toggleTime(t, getDragMoved())} 
              className={`
                shrink-0 rounded-full border px-5 py-2 text-[14px] transition-colors duration-200
                ${selectedTimes.includes(t) 
                  ? 'border-blue-500 bg-blue-50 font-bold text-blue-600 dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-400' 
                  : 'border-gray-300 text-gray-500 hover:border-gray-400 dark:border-white/10 dark:text-makcha-navy-300'
                }
              `}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative h-[2px] w-full bg-gray-100 dark:bg-white/5 overflow-hidden">
          <div 
            ref={indicatorRef}
            className="absolute h-[2px] bg-blue-500 dark:bg-blue-400" 
            style={{ left: 0, willChange: 'transform', transition: 'none' }} 
          />
        </div>
      </div>
    </div>
  );
}