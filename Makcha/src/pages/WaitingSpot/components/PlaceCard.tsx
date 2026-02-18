import type { PlaceCardProps } from "../types/waitingspot";
import owl from "../../../assets/owl.png"
import React from "react";

export const PlaceCard = React.memo(({ place, onSelect }: PlaceCardProps) => {
  //const badge = place.isOpen24Hours ? "24시간 영업" : "영업시간 정보 없음";
  //  이미지 URL에 도메인 붙이기
  const imageUrl = place.thumbnailUrl 
    ? `https://api.makcha.store${place.thumbnailUrl}` 
    : null;

  //  오늘 요일 영업시간만 파싱
  const getTodayHours = () => {
    if (!place.operatingHours) {
      return place.isOpen24Hours ? "24시간 영업" : "영업시간 정보 없음";
    }
    if (place.operatingHours.includes("24시간")) return "24시간 영업";

    // "매일" 케이스 추가
    if (place.operatingHours.startsWith("매일")) {
      const hours = place.operatingHours.split(": ").slice(1).join(": ");
      return `영업 중 · ${hours}`;
    }

    const dayMap: Record<number, string> = {
      0: "일", 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토"
    };
    const today = dayMap[new Date().getDay()];
    
    // "월: 07:30 - 16:00\n화: ..." 형태에서 오늘 줄만 찾기
    const lines = place.operatingHours.split("\n");
    const todayLine = lines.find(line => line.startsWith(today));
    
    if (!todayLine) return "오늘 휴무";
    
    // "월: 07:30 - 16:00" → "07:30 - 16:00"
    const hours = todayLine.split(": ").slice(1).join(": ");
    return `영업 중 · ${hours}`;
  };

  const badge = getTodayHours();

  return (
    <button
      className="flex gap-4 rounded-xl bg-white
      dark:bg-makcha-navy-900"
      onClick={() => onSelect(place.id)} //setSelectedPlace에 선택 장소 저장
    >
      {/* {place.thumbnailUrl ?
        <img className="w-24 h-24 rounded-[20px] shrink-0" src={place.thumbnailUrl} />
        : <div className="w-24 h-24 rounded-[20px] shrink-0 bg-gray-200 flex items-center justify-center">
          <img
            className="w-12 h-12 object-contain"
            src={owl}
            alt="기본 이미지"/>
        </div>} */}
      {/* imageUrl로 교체 */}
      {imageUrl ?
        <img className="w-24 h-24 rounded-[20px] shrink-0" src={imageUrl} />
        : <div className="w-24 h-24 rounded-[20px] shrink-0 bg-gray-200 flex items-center justify-center">
          <img
            className="w-12 h-12 object-contain"
            src={owl}
            alt="기본 이미지"/>
        </div>}


      {/* 오른쪽 콘텐츠 */}
      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="font-semibold text-base text-gray-900 truncate
          dark:text-makcha-navy-200">
            {place.name}
          </h3>
        </div>

        <p className="text-sm text-gray-600 text-left truncate
        dark:text-makcha-navy-400">
          {Math.round(place.distance ?? 0)}m {place.address}
        </p>

        {badge && (
          <span className="inline-block w-fit rounded-full bg-makcha-navy-600 px-4 py-1 text-small text-white whitespace-nowrap
          dark:text-makcha-navy-200 dark:bg-makcha-navy-800 dark:border-makcha-navy-600">
            {badge}
          </span>
        )}
      </div>
    </button>
  );
});
