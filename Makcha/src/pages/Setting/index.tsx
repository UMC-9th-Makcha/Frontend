import { useState, useCallback, useMemo } from "react";
import { SettingPanel } from "./components/SettingPanel";
import { SettingBg } from "./components/BgSection";
import { useSettingStore } from "../../store/useSettingStore";
import { useBack } from "../../hooks/useBack";
import type { Place } from "../../types/setting";
import type { ViewType } from "./constants";
import PlaceSetting from "./components/PlaceSetting";
import { PhonenumberSetting } from "./components/PhonenumberSetting";

export default function Setting() {
  const view = useSettingStore((state) => state.view);
  const setView = useSettingStore((state) => state.setView);
  const home = useSettingStore((state) => state.home);
  const savePlace = useSettingStore((state) => state.savePlace);
  const deleteFavorite = useSettingStore((state) => state.deleteFavorite);
  
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);

  const handleBack = useCallback(() => {
    setView('MAIN');
    setEditingPlace(null);
  }, [setView]);

  useBack(view, handleBack);

  const handleNavigate = useCallback((v: ViewType, p?: Place) => {
    setView(v);
    if (p) setEditingPlace(p);
  }, [setView]);

  const detailView = useMemo(() => {
    const props = { 
      onBack: handleBack, 
      onSave: (p: Place) => { savePlace(p); handleBack(); } 
    };

    switch (view) {
      case 'EDIT_HOME':
        return home ? <PlaceSetting place={home} {...props} /> : null;
      case 'EDIT_FAVORITE':
        return editingPlace ? (
          <PlaceSetting 
            {...props} 
            place={editingPlace} 
            onDelete={(id) => { deleteFavorite(id); handleBack(); }} 
          />
        ) : null;
      case 'EDIT_CONTACT':
        return <PhonenumberSetting onBack={handleBack} />;
      default:
        return null;
    }
  }, [view, home, editingPlace, handleBack, savePlace, deleteFavorite]);

  return (
    <div className="h-dvh w-full flex overflow-hidden bg-white dark:bg-makcha-navy-900">
      <SettingPanel 
        view={view} 
        onNavigate={handleNavigate} 
      />

      <div className="flex-1 h-full relative overflow-hidden">
        <SettingBg view={view}>
          {detailView}
        </SettingBg>
      </div>

    </div>
  );
}