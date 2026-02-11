import { memo } from "react";
import { Home, Star, Plus, ChevronRight } from "lucide-react";

import type { Place } from "../types/setting";
import { DEFAULT_HOME, type ViewType } from "../constants";
import { usePlaceSetting } from "../hooks/usePlaceSetting";

const PlaceListItem = memo(({ icon, place, onClick }: { icon: React.ReactNode; place: Place; onClick: () => void }) => {
  const isHome = place.id === 'home';
  const mainAddress = isHome ? "집" : (place.place_address || "새 장소");

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
        <div className="shrink-0 rounded-full bg-gray-50 p-2 dark:bg-makcha-navy-800 transition-colors group-hover:bg-gray-100 dark:group-hover:bg-makcha-navy-700">
          {icon}
        </div>
        <div className="min-w-0 flex flex-col">
          <p className="truncate text-body font-semibold leading-tight">
            {mainAddress}
          </p>

          {subAddress && (
            <p className="mt-1 truncate text-caption text-gray-400 max-w-[200px] md:max-w-[300px]">
              {subAddress}
            </p>
          )}
        </div>
      </div>
      <ChevronRight size={18} className="shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
});

PlaceListItem.displayName = 'PlaceListItem';

export function PlacesSection({ onNavigate }: { onNavigate: (v: ViewType, p?: Place) => void }) {
  const { home, favorites, isLoading } = usePlaceSetting();
  const safeHome = home ?? DEFAULT_HOME;

  if (isLoading) {
    return (
      <div className="mb-10 px-1 py-10 text-center">
        <div className="animate-pulse text-caption text-gray-400">장소 목록을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-between px-1">
        <p className="text-h2 font-semibold dark:text-white">장소</p>
        
        <button 
          onClick={() => onNavigate('EDIT_FAVORITE', { 
            id: `new-${Date.now()}`,
            provider_place_id: '',
            place_address: '',
            place_detail_address: '',
            latitude: 0,
            longitude: 0
          })} 
          className="flex items-center gap-1 text-small font-bold text-makcha-navy-400 hover:text-makcha-navy-600 transition-transform active:scale-95"
        >
          <Plus size={14} strokeWidth={3} /> 추가
        </button>
      </div>

      <div className="flex flex-col">
        {/* 집 설정 */}
        <PlaceListItem 
          icon={<Home size={20} className="text-makcha-navy-600" />} 
          place={safeHome} 
          onClick={() => onNavigate('EDIT_HOME', safeHome)}
        />
        
        {/* 즐겨찾기 목록 */}
        {favorites.length > 0 && (
          <div className="mt-1 flex flex-col border-t border-gray-200 dark:border-white/5">
            {favorites.map((fav) => (
              <PlaceListItem 
                key={fav.id} 
                icon={<Star size={20} className="text-makcha-yellow-400" />} 
                place={fav} 
                onClick={() => onNavigate('EDIT_FAVORITE', fav)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}