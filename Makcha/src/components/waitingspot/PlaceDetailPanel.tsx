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


export const PlaceDetailPanel = ({ place, onStartDirection }: PlaceDetailProps) => {

  if (!place) return null;

  const detail = mockPlaceDetails.find((d) => d.id === place.id) ?? null;

  return (
    <div className="flex flex-col h-full">
      {/* 상단 이미지 */}
      <div className="relative h-80 w-full shrink-0 bg-gray-100 overflow-hidden rounded-[20px]">
        <img
          src={detail?.imageUrl}
          alt="place"
          className="h-full w-full object-cover"
        />
      </div>

      {/* 본문 */}
      <div className="px-2 pt-6">
        <div className="flex items-end gap-4">
          <h2 className="text-[26px] font-extrabold text-gray-900 
          dark:text-white">
            {place.name}
          </h2>
          <span className="pb-1 text-[16px] font-semibold text-gray-500 
          dark:text-makcha-navy-400">
            {detail?.subcategory}
          </span>
        </div>

        <div className="mt-4 flex rounded-lg gap-2 overflow-x-auto">
          {(detail?.badge ?? []).map((badge) => (
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
        <div className="mt-6 mb-20 space-y-4 text-[16px] text-gray-900 
        dark:text-makcha-navy-200">
          <div className="flex items-center gap-4 font-semibold">
            <span>도보 {Math.ceil(place.durationSeconds / 60)}분</span>
            <span>{place.distanceMeter}m</span>
          </div>

          <div>{place.address}</div>
          <div>{detail?.accessInfo}</div>
          {detail?.phone && <div>{detail.phone}</div>}
        </div>

        {/* 하단 버튼 */}
      </div>
      <div className="mt-auto pt-6">
        <button
          className="w-full h-12 rounded-full bg-makcha-navy-400 text-white text-[20px] border hover:bg-makcha-navy-600 transition
            dark:text-makcha-navy-200 dark:bg-makcha-navy-800 dark:border-makcha-navy-600"
            onClick={() => onStartDirection?.()}
        >
          도보 길 안내 시작
        </button>

      </div>
    </div>
  );
};