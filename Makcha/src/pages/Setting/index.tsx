import { useState, useEffect, useCallback } from "react";
import { Home, Star, ChevronRight, Plus } from "lucide-react";
import { useAuth } from '../../hooks/useAuth';
import { useDragScroll } from "../../hooks/useDragScroll";
import { UserIcon } from "../../components/dashboard/UserIcon";
import PlaceListItem from "./PlaceListItem";
import PlaceSetting from "./PlaceSetting";
import PhonenumberSetting from "./PhonenumberSetting";
import { TIMES, type ViewType } from "./constants";
import type { Place } from "../../types/setting";

export default function Setting() {
  const { setLogout, user } = useAuth();
  const { scrollerRef, indicator, onMouseDown, onScroll, isDragging, dragMoved } = useDragScroll();

  const [view, setView] = useState<ViewType>('MAIN');
  const [selectedTimes, setSelectedTimes] = useState<string[]>(['10분']);
  const [home, setHome] = useState<Place>({ 
    id: 'home', name: '우리 집', address: '서울특별시 성북구 종암로 83', detail: '101동 202호' 
  });
  const [favorites, setFavorites] = useState<Place[]>([
    { id: '1', name: '회사', address: '서울 강남구 테헤란로 123', detail: '7층 개발본부' }
  ]);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);

  // 뒤로가기 처리
  useEffect(() => {
    if (view === 'MAIN') return;
    window.history.pushState(null, '', '');
    const handleBack = () => setView('MAIN');
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [view]);

  const toggleTime = useCallback((time: string) => {
    if (dragMoved) return;
    setSelectedTimes(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
  }, [dragMoved]);

  const handleAddPlace = useCallback(() => {
    setEditingPlace({ id: Date.now().toString(), name: '', address: '', detail: '' });
    setView('EDIT_FAVORITE');
  }, []);

  const handleSavePlace = useCallback((updatedPlace: Place) => {
    if (updatedPlace.id === 'home') {
      setHome(updatedPlace);
    } else {
      setFavorites(prev => 
        prev.some(p => p.id === updatedPlace.id) 
          ? prev.map(p => p.id === updatedPlace.id ? updatedPlace : p) 
          : [...prev, updatedPlace]
      );
    }
    setView('MAIN');
  }, []);

  const handleDeleteFavorite = useCallback((id: string) => {
    setFavorites(f => f.filter(p => p.id !== id));
    setView('MAIN');
  }, []);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-white transition-colors dark:bg-makcha-navy-900">
      
      {/* 사이드바 섹션 */}
      <section className={`${view !== 'MAIN' ? 'hidden md:flex' : 'flex'} h-full w-full flex-col border-r border-gray-100 bg-white dark:border-makcha-navy-800 dark:bg-makcha-navy-900 md:w-[380px] md:shrink-0`}>
        <div className="no-scrollbar flex-1 overflow-y-auto px-[20px] pt-[30px] md:pt-[60px]">
          <h1 className="mb-8 hidden text-[26px] font-bold tracking-tight dark:text-white md:block">환경설정</h1>

          {/* 알림 설정 */}
          <div className="mb-10">
            <p className="mb-4 text-[18px] font-semibold dark:text-white">알림</p>
            <div className="relative">
              <div 
                ref={scrollerRef} 
                onMouseDown={onMouseDown} 
                onScroll={onScroll} 
                className={`no-scrollbar flex gap-2 overflow-x-auto pb-3 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              >
                {TIMES.map(time => (
                  <button 
                    key={time} 
                    onClick={() => toggleTime(time)} 
                    className={`shrink-0 cursor-pointer rounded-full border px-5 py-2 text-[14px] transition-all focus:outline-none ${
                      selectedTimes.includes(time) 
                        ? 'border-blue-400 bg-blue-50 font-bold text-blue-600 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'border-gray-100 bg-white text-gray-400 dark:border-transparent dark:bg-makcha-navy-800'
                    }`}
                  >
                    {time}
                  </button>
                ))}
                <div className="w-[20px] shrink-0" />
              </div>
              <div className="relative h-[2px] w-full overflow-hidden bg-gray-50 dark:bg-makcha-navy-800">
                <div 
                  className="absolute h-[2px] bg-blue-500 transition-all duration-150 ease-out dark:bg-blue-400" 
                  style={{ left: indicator.left, width: indicator.width }} 
                />
              </div>
            </div>
          </div>

          {/* 장소 설정 */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between px-1">
              <p className="text-[18px] font-semibold dark:text-white">장소</p>
              <button 
                onClick={handleAddPlace} 
                className="flex cursor-pointer items-center gap-0.5 text-sm font-bold text-blue-500 transition-opacity hover:opacity-80 focus:outline-none"
              >
                <Plus size={14} /> 추가
              </button>
            </div>
            <div className="flex flex-col">
              <PlaceListItem 
                icon={<Home size={20} className="text-blue-500" />} 
                place={home} 
                onClick={() => { setEditingPlace(home); setView('EDIT_HOME'); }} 
              />
              {favorites.map(fav => (
                <div key={fav.id} className="border-t border-gray-50 dark:border-makcha-navy-800/50">
                  <PlaceListItem 
                    icon={<Star size={20} className="text-makcha-yellow-400" />} 
                    place={fav} 
                    onClick={() => { setEditingPlace(fav); setView('EDIT_FAVORITE'); }} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 계정 & 연락처 */}
          <div className="mb-10 px-1">
            <p className="mb-4 text-[18px] font-semibold dark:text-white">계정</p>
            <div className="space-y-4">
              <div>
                <p className="text-[20px] font-bold leading-tight dark:text-white">{user?.name || "서막차"} 님</p>
                <div className="mt-2 flex items-center gap-2">
                  <UserIcon user={user} className="h-6 w-6" /> 
                  <p className="text-[15px] font-medium text-gray-600 dark:text-makcha-navy-300">{user?.email || "makcha@kakao.com"}</p>
                </div>
              </div>
              <button 
                onClick={() => setView('EDIT_CONTACT')} 
                className="group flex w-full cursor-pointer items-center justify-between border-t border-gray-50 pt-4 transition-colors focus:outline-none dark:border-makcha-navy-800"
              >
                <span className="text-[15px] text-gray-500">연락처</span>
                <div className="flex items-center gap-1 font-medium dark:text-white">
                  <span>010-1234-5678</span>
                  <ChevronRight size={18} className="text-gray-300 transition-colors group-hover:text-gray-500" />
                </div>
              </button>
            </div>
          </div>

          <button 
            onClick={() => setLogout()} 
            className="w-full cursor-pointer rounded-xl border border-gray-100 py-4 font-medium text-gray-400 transition-colors focus:outline-none active:bg-gray-50 dark:border-makcha-navy-800 dark:text-makcha-navy-400 dark:active:bg-makcha-navy-800"
          >
            로그아웃
          </button>
        </div>
      </section>

      {/* 상세 뷰 */}
      <section className={`${view === 'MAIN' ? 'hidden md:flex' : 'flex'} flex-1 overflow-y-auto bg-gray-50 items-start justify-start p-0 dark:bg-makcha-navy-950 md:p-6 md:pl-4`}>
        {view === 'EDIT_HOME' && (
          <PlaceSetting 
            place={home} 
            onBack={() => setView('MAIN')} 
            onSave={handleSavePlace} 
          />
        )}
        {view === 'EDIT_FAVORITE' && editingPlace && (
          <PlaceSetting 
            place={editingPlace} 
            onBack={() => setView('MAIN')} 
            onSave={handleSavePlace} 
            onDelete={handleDeleteFavorite} 
          />
        )}
        {view === 'EDIT_CONTACT' && (
          <PhonenumberSetting onBack={() => setView('MAIN')} />
        )}
      </section>
    </div>
  );
}