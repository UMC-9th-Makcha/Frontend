import { memo } from "react";
import { ChevronRight } from "lucide-react";
import type { PlaceListItemProps } from "../../types/setting";

const PlaceListItem = memo(({ icon, place, onClick }: PlaceListItemProps) => {
  // place 객체에서 필요한 값 미리 추출
  const { name, address } = place;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between px-1 py-5 text-left transition-all active:bg-gray-50 dark:active:bg-makcha-navy-800"
    >
      <div className="flex items-center gap-4 overflow-hidden">
        {/* 아이콘 컨테이너 */}
        <div className="shrink-0 rounded-full bg-gray-50 p-2 dark:bg-makcha-navy-800">
          {icon}
        </div>

        {/* 텍스트 정보 */}
        <div className="min-w-0 overflow-hidden">
          <p className="truncate text-[16px] font-bold leading-tight dark:text-white">
            {name || "새 장소"}
          </p>
          <p className="mt-0.5 w-[160px] truncate text-xs text-gray-400 md:w-[200px]">
            {address || "주소를 등록해주세요"}
          </p>
        </div>
      </div>

      {/* 화살표 아이콘 */}
      <ChevronRight size={18} className="shrink-0 text-gray-300" />
    </button>
  );
});

PlaceListItem.displayName = "PlaceListItem";

export default PlaceListItem;