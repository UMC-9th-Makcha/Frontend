import { useState, useEffect, useCallback } from "react";
import { SettingPanel } from "./SettingPanel";
import { SettingBg } from "./SettingBg";
import PlaceSetting from "./PlaceSetting";
import PhonenumberSetting from "./PhonenumberSetting";
import type { Place } from "../../types/setting";
import type { ViewType } from "./constants";

// 뒤로가기 로직 커스텀 훅으로 분리
const useBackNavigation = (view: ViewType, onBack: () => void) => {
  useEffect(() => {
    if (view === 'MAIN') return;

    window.history.pushState(null, '', '');
    window.addEventListener('popstate', onBack);
    return () => window.removeEventListener('popstate', onBack);
  }, [view, onBack]);
};

export default function Setting() {
  const [view, setView] = useState<ViewType>('MAIN');
  const [home, setHome] = useState<Place>({ id: 'home', name: '우리 집', address: '서울특별시 성북구 종암로 83', detail: '101동 202호' });
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);

  const handleBack = useCallback(() => setView('MAIN'), []);
  useBackNavigation(view, handleBack);

  const handleSave = useCallback((updated: Place) => {
    if (updated.id === 'home') {
      setHome(updated);
    } else {
      setFavorites(prev => 
        prev.some(p => p.id === updated.id) 
          ? prev.map(p => p.id === updated.id ? updated : p) 
          : [...prev, updated]
      );
    }
    handleBack();
  }, [handleBack]);

  const handleDelete = useCallback((id: string) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
    handleBack();
  }, [handleBack]);

  const renderDetail = () => {
    switch (view) {
      case 'EDIT_HOME':
        return <PlaceSetting place={home} onBack={handleBack} onSave={handleSave} />;
      case 'EDIT_FAVORITE':
        return editingPlace && (
          <PlaceSetting 
            place={editingPlace} 
            onBack={handleBack} 
            onSave={handleSave} 
            onDelete={handleDelete} 
          />
        );
      case 'EDIT_CONTACT':
        return <PhonenumberSetting onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-white dark:bg-makcha-navy-900">
      <SettingPanel 
        view={view}
        data={{ home, favorites }} // props를 객체로 묶어 전달
        onNavigate={(v, p) => { setView(v); if(p) setEditingPlace(p); }}
      />
      <SettingBg view={view}>{renderDetail()}</SettingBg>
    </div>
  );
}