import { type ReactNode, memo } from "react";
import { useDragScroll } from "./hooks/useDragScroll";

interface HorizontalScrollProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  onItemClick: (item: T, moved: boolean) => void;
  className?: string;
  contentClassName?: string;
}

function HorizontalScrollBase<T>({
  items,
  renderItem,
  onItemClick,
  className = "",
  contentClassName = "",
}: HorizontalScrollProps<T>) {
  const { containerProps, indicatorProps, withDragCheck } = useDragScroll();

  return (
    <div className={`relative ${className}`}>
      {/* 스크롤 컨테이너 */}
      <div
        {...containerProps}
        className="no-scrollbar flex gap-2 overflow-x-auto pb-3"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`shrink-0 ${contentClassName}`}
            onClick={withDragCheck((moved) => onItemClick(item, moved))}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* 인디케이터 */}
      <div className="relative h-[2px] w-full bg-gray-100 dark:bg-white/5 overflow-hidden">
        <div
          {...indicatorProps}
          className="absolute h-[2px] bg-blue-500 dark:bg-blue-300"
        />
      </div>
    </div>
  );
}

export const HorizontalScroll = memo(HorizontalScrollBase) as typeof HorizontalScrollBase;