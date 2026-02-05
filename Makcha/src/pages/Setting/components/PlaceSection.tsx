import { memo, useEffect } from "react";
import { Home, Star, Plus, ChevronRight } from "lucide-react";
import { useSettingStore } from "../../../store/useSettingStore";
import type { Place } from "../types/setting";
import { DEFAULT_HOME, type ViewType } from "../constants";

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
  const { home, favorites, fetchPlaces } = useSettingStore();

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  const safeHome = home ?? DEFAULT_HOME;

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