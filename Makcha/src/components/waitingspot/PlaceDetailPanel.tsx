import { X } from "lucide-react";
import type { PlaceDetail, PlaceDetailProps } from "../../types/waitingspot";

const mockPlaceDetails: PlaceDetail[] = [
  {
    id: 1,
    subcategory: "스터디 카페",
    imageUrl: "https://placehold.co/400x300",
    accessInfo: "당곡역 2번 출구에서 152m",
    phone: "02-1234-5678",
    badge: ["24시간", "연중무휴"],
  },
  {
    id: 2,
    subcategory: "PC방",
    imageUrl: "https://placehold.co/400x300",
    accessInfo: "당곡역 2번 출구에서 152m",
    phone: "02-1234-5678",
    badge: ["24시간", "연중무휴"],
  },
  {
    id: 3,
    subcategory: "찜질방",
    imageUrl: "https://placehold.co/400x300",
    accessInfo: "당곡역 2번 출구에서 152m",
    phone: "02-1234-5678",
    badge: ["24시간", "연중무휴"],
  },
  {
    id: 4,
    subcategory: "스터디 카페",
    imageUrl: "https://placehold.co/400x300",
    accessInfo: "당곡역 2번 출구에서 152m",
    phone: "02-1234-5678",
    badge: ["24시간", "연중무휴"],
  },
];


export const PlaceDetailPanel = ({ place, onClose }: PlaceDetailProps) => {
  if (!place) return null;

  const detail = mockPlaceDetails.find((d) => d.id === place.id) ?? null;

  return (
    <aside className="flex flex-col w-[402px] h-[961px] rounded-[20px] bg-white shadow-[0_0_15px_0_#88888859] overflow-hidden
    dark:bg-makcha-navy-900">
      {/* 상단 이미지 */}
      <div className="relative h-[268px] w-full bg-gray-100">
        <img
          src={detail?.imageUrl}
          alt="place"
          className="h-full w-full object-cover"
        />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow"
          aria-label="닫기"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* 본문 */}
      <div className="flex-1 px-7 pt-6">
        <div className="flex items-end gap-3">
          <h2 className="text-[26px] font-extrabold text-gray-900 dark:text-white">
            {place.name}
          </h2>
          <span className="pb-1 text-[16px] font-semibold text-gray-500 dark:text-makcha-navy-400">
            {detail?.subcategory}
          </span>
        </div>

        <div className="mt-4 flex rounded-lg gap-[6px]">
          {(detail?.badge ?? []).map((badge) => (
            <span
              key={badge}
              className="flex items-center h-[35px] px-[18px] text-[14px] rounded-[20px] shadow-[0_0_5px_0_#88888840]
              text-makcha-navy-600 bg-[#F3F7FF] border-makcha-navy-400 border-[0.5px]
              dark:text-makcha-navy-200 dark:bg-makcha-navy-800 dark:border-makcha-navy-600"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* 정보 텍스트 */}
        <div className="mt-5 space-y-3 text-[16px] text-gray-900 dark:text-makcha-navy-200">
          <div className="flex items-center gap-4 font-semibold">
            <span>도보 {Math.ceil(place.durationSeconds / 60)}분</span>
            <span>{place.distanceMeter}m</span>
          </div>

          <div>{place.address}</div>
          <div>{detail?.accessInfo}</div>

          {detail?.phone && <div>{detail.phone}</div>}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex flex-col items-center py-[100px]">
        <button
          className="w-[362px] h-[50px] rounded-full bg-makcha-navy-400 text-white text-[20px] border hover:bg-makcha-navy-600 transition
          dark:text-makcha-navy-200 dark:bg-makcha-navy-800 dark:border-makcha-navy-600"
        >
          도보 길 안내 시작
        </button>
      </div>
    </aside>
  );
};

