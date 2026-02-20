import { MapPin, Phone, Clock } from "lucide-react";
import type { PlaceDetailProps } from "../types/waitingspot";
import owl from "../../../assets/owl.png"
import LoadingSpinner from "../../../components/common/loadingSpinner";
import { EmptyState } from "../common/EmptyState";

export const PlaceDetailPanel = ({ place, loading, error, refetch }: PlaceDetailProps) => {
  // 이미지 URL에 도메인 붙이기
  const imageUrl = place?.thumbnailUrl
    ? `https://api.makcha.store${place.thumbnailUrl}`
    : null;

   //  오늘 영업시간만 파싱 (PlaceCard랑 동일한 로직)
   const getTodayHours = () => {
    if (!place?.operatingHours) {
      return place?.isOpen24Hours ? "24시간 영업" : "영업시간 정보 없음";
    }
    if (place.operatingHours.includes("24시간")) return "24시간 영업";
    if (place.operatingHours.startsWith("매일")) {
      const hours = place.operatingHours.split(": ").slice(1).join(": ");
      return `영업 중 · ${hours}`;
    }
    const dayMap: Record<number, string> = {
      0: "일", 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토"
    };
    const today = dayMap[new Date().getDay()];
    const lines = place.operatingHours.split("\n");
    const todayLine = lines.find(line => line.startsWith(today));
    if (!todayLine) return "오늘 휴무";
    const hours = todayLine.split(": ").slice(1).join(": ");
    return `영업 중 · ${hours}`;
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        className="pointer-events-none"
        message="상세 정보를 불러오지 못했어요."
        actionLabel="다시 불러오기"
        onRetry={refetch} />
    );
  }

  if (!place) return null;

  return (
    <div className="flex flex-col h-full">
      {/* 상단 이미지 */}
      <div className="relative h-80 w-full shrink-0 bg-gray-100 overflow-hidden rounded-[20px]">
        {/* imageUrl로 교체 */}
        {imageUrl ? (
          <img src={imageUrl} alt="place" className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={owl}
              alt="기본 이미지"
              className="w-40 h-40 object-contain opacity-80" />
          </div>
        )}
      </div>

      {/* 본문 */}
      <div className="px-2 pt-6">
        <div className="flex items-end gap-2">
          <h2 className="text-h1 font-extrabold">
            {place.name}
          </h2>
          <span className="pb-1 text-title text-gray-500 
          dark:text-makcha-navy-400">
            {place.category}
          </span>
        </div>

         {/* 배지: 오늘 영업시간만 */}
         <div className="mt-4 flex gap-2">
          <span className="flex items-center h-10 px-4 text-small rounded-[20px] shadow-sm
            text-makcha-navy-600 bg-[#F3F7FF] border border-makcha-navy-400
            dark:text-makcha-navy-200 dark:bg-makcha-navy-800 dark:border-makcha-navy-600">
            {getTodayHours()}
          </span>
        </div>

        {/* 정보 텍스트 */}
        <div className="mt-6 mb-20 space-y-3 text-body text-gray-900 
        dark:text-makcha-navy-200">
          <div className="flex items-center font-semibold">
            <span>{place.distance}m</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>{place.address}</div>
          </div>
          {place.phoneNumber ? (
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>{place.phoneNumber}</div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <div className="text-gray-400">전화번호 정보 없음</div>
            </div>
          )}
          {/* 전체 영업시간 나열 */}
          {place.operatingHours && !place.operatingHours.includes("24시간") && (
            <div className="flex gap-2 pt-1">
              <Clock className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
              <div className="text-sm text-gray-600 dark:text-makcha-navy-400 whitespace-pre-line">
                {place.operatingHours}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};