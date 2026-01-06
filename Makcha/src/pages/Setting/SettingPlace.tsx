import { Home, Star, Plus } from "lucide-react";
import PlaceListItem from "./PlaceListItem";
import { useSettingStore } from "../../store/useSettingStore";
import type { SettingPlacesProps } from "../../types/setting";

export function SettingPlaces({ onNavigate }: SettingPlacesProps) {
  const { home, favorites } = useSettingStore();

  return (
    <div className="mb-10">
      {/* 헤더 영역 */}
      <div className="mb-4 flex items-center justify-between px-1">
        <p className="text-[18px] font-semibold text-gray-900 dark:text-white">장소</p>
        <button 
          onClick={() => onNavigate('EDIT_FAVORITE', { id: Date.now().toString(), name: '', address: '', detail: '' })} 
          className="flex items-center gap-0.5 text-sm font-bold text-blue-500 transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 whitespace-nowrap"
        >
          <Plus size={14} strokeWidth={3} /> 추가
        </button>
      </div>
      
      {/* 우리집 */}
      {home && (
        <div className="overflow-hidden rounded-xl bg-transparent transition-all">
          <PlaceListItem 
            icon={<Home size={20} className="text-blue-500" />} 
            place={home} 
            onClick={() => onNavigate('EDIT_HOME')} 
          />
        </div>
      )}
      
      {/* 즐겨찾기 */}
      <div className="mt-1 flex flex-col">
        {favorites.map((fav, index) => (
          <div 
            key={fav.id} 
            className={`
              border-t border-gray-100 
              dark:border-white/5
              ${index === 0 && !home ? 'border-t-0' : ''}
            `}
          >
            <PlaceListItem 
              icon={<Star size={20} className="text-makcha-yellow-400" />} 
              place={fav} 
              onClick={() => onNavigate('EDIT_FAVORITE', fav)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}