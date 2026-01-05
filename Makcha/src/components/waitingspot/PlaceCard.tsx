import type { PlaceCardProps } from "../../types/waitingspot";

export const PlaceCard = ({ place, onSelect }: PlaceCardProps) => {
  return (
    <button
      className="flex gap-[10px] rounded-xl bg-white p-2
      dark:bg-makcha-navy-900"
      onClick={onSelect} //setSelectedPlace에 선택 장소 저장
      >
      <div className="w-[100px] h-[100px] rounded-[20px] bg-gray-300 shrink-0" />

      {/* 오른쪽 콘텐츠 */}
      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-base text-gray-900 truncate
          dark:text-makcha-navy-200">
            {place.name}
          </h3>
          <span className="text-sm text-gray-500 whitespace-nowrap
          dark:text-makcha-navy-400">
            도보 {Math.ceil(place.durationSeconds / 60)}분
          </span>
        </div>

        <p className="text-sm text-gray-600 truncate
        dark:text-makcha-navy-400">
          {place.distanceMeter}m {place.address}
        </p>

        {place.badge && (
          <span className="inline-block w-fit rounded-full bg-[#4F73C3] px-3 py-1 text-sm text-white
          dark:text-makcha-navy-200 dark:bg-makcha-navy-800 dark:border-makcha-navy-600">
            {place.badge}
          </span>
        )}
      </div>
    </button>
  );
};
