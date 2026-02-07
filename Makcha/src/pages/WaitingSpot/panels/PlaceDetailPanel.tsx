import { MapPin, Phone } from "lucide-react";
import type { PlaceDetailProps } from "../../../types/waitingspot";
import owl from "../../../assets/owl.png"
import LoadingSpinner from "../../../components/common/loadingSpinner";
import { EmptyState } from "../common/EmptyState";

export const PlaceDetailPanel = ({ place, loading, error, refetch }: PlaceDetailProps) => {
  const isCurrentlyOpen = true ? "운영 중" : "운영 마감"
  const badge = [place?.operatingHours, isCurrentlyOpen]

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
        {place.thumbnailUrl ? (
          <img
            src={place.thumbnailUrl}
            alt="place"
            className="h-full w-full object-cover" />
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
          <h2 className="text-[26px] font-extrabold text-gray-900 
          dark:text-white">
            {place.name}
          </h2>
          <span className="pb-1 text-[20px] text-gray-500 
          dark:text-makcha-navy-400">
            {place.category}
          </span>
        </div>

        <div className="mt-4 flex rounded-lg gap-2 overflow-x-auto">
          {badge.map((badge) => (
            <span
              key={badge}
              className="flex items-center h-10 px-4 text-[14px] rounded-[20px] shadow-[0_0_5px_0_#88888840]
              text-makcha-navy-600 bg-[#F3F7FF] border border-makcha-navy-400 border-[0.5px]
              dark:text-makcha-navy-200 dark:bg-makcha-navy-800 dark:border-makcha-navy-600"
            >
              {badge}
            </span>
          ))}
        </div>
        {/* 정보 텍스트 */}
        <div className="mt-6 mb-20 space-y-3 text-[16px] text-gray-900 
        dark:text-makcha-navy-200">
          <div className="flex items-center font-semibold">
            <span>{place.distance}m</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>{place.address}</div>
          </div>
          {place.phoneNumber && (
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>{place.phoneNumber}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
