import { memo } from "react";
import { Home, Star, Plus, ChevronRight } from "lucide-react";

import type { Place } from "../types/setting";
import { DEFAULT_HOME, type ViewType } from "../constants";
import { usePlaceSetting } from "../hooks/usePlaceSetting";

const PlaceListItem = memo(({ icon, place, onClick }: { icon: React.ReactNode; place: Place; onClick: () => void }) => {
  const isHome = place.id === 'home';

  // 주소
  const mainAddress = isHome ? "집" : (place.place_address || "새 장소");

  // 상세 주소
  const subAddress = isHome 
    ? (place.place_address || "주소를 등록해주세요") 
    : (place.place_detail_address || "");

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between px-1 py-5 text-left transition-all active:bg-gray-50 dark:active:bg-makcha-navy-800"
    >
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="shrink-0 rounded-full bg-gray-50 p-2 dark:bg-makcha-navy-800">{icon}</div>
        <div className="min-w-0">
          {/* 주소 */}
          <p className="truncate text-[16px] font-bold dark:text-white">
            {mainAddress}
          </p>

          {/* 상세 주소 */}
          {subAddress && (
            <p className="mt-0.5 truncate text-xs text-gray-400 w-[160px] md:w-[200px]">
              {subAddress}
            </p>
          )}
        </div>
      </div>
      <ChevronRight size={18} className="shrink-0 text-gray-300" />
    </button>
  );
});

export function PlacesSection({ onNavigate }: { onNavigate: (v: ViewType, p?: Place) => void }) {
  // ✅ 스토어 대신 훅 사용
  // useEffect 없이도 컴포넌트 마운트 시 자동으로 데이터를 불러옵니다.
  // 500 에러가 나도 앱이 죽지 않고 빈 데이터([])를 반환합니다.
  const { home, favorites, isLoading } = usePlaceSetting();

  const safeHome = home ?? DEFAULT_HOME;

  // 로딩 중일 때 표시할 UI (선택 사항)
  if (isLoading) {
    return <div className="p-4 text-center text-gray-400 text-sm">정보를 불러오는 중...</div>;
  }

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-between px-1">
        <p className="text-[18px] font-semibold dark:text-white">장소</p>
        <button 
          onClick={() => onNavigate('EDIT_FAVORITE', { 
            id: Date.now().toString(), 
            place_address: '',
            place_detail_address: '',
            latitude: 0,
            longitude: 0
          })} 
          className="flex items-center gap-0.5 text-sm font-bold text-blue-500 hover:text-blue-600"
        >
          <Plus size={14} strokeWidth={3} /> 추가
        </button>
      </div>

      {/* 집 */}
      <PlaceListItem 
        icon={<Home size={20} className="text-blue-500" />} 
        place={safeHome} 
        onClick={() => onNavigate('EDIT_HOME', safeHome)}
      />
      
      {/* 즐겨찾기 목록 */}
      <div className="mt-1 flex flex-col border-t border-gray-100 dark:border-white/5">
        {favorites.map((fav) => (
          <PlaceListItem 
            key={fav.id} 
            icon={<Star size={20} className="text-makcha-yellow-400" />} 
            place={fav} 
            onClick={() => onNavigate('EDIT_FAVORITE', fav)} 
          />
        ))}
      </div>
    </div>
  );
}