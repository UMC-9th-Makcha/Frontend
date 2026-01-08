import { useState, useCallback, useMemo } from "react";
import { SettingPanel } from "./components/SettingPanel";
import { SettingBg } from "./components/SettingBg";
import PlaceSetting from "./components/Place/PlaceSetting";
import PhonenumberSetting from "./components/PhonenumberSetting";
import { useSettingStore } from "../../store/useSettingStore";
import type { Place } from "../../types/setting";
import type { ViewType } from "./constants";
import { useBack } from "../../hooks/useBack";

export default function Setting() {

  const view = useSettingStore((state) => state.view);
  const setView = useSettingStore((state) => state.setView);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);

  const home = useSettingStore((state) => state.home);
  const savePlace = useSettingStore((state) => state.savePlace);
  const deleteFavorite = useSettingStore((state) => state.deleteFavorite);

  const handleBack = useCallback(() => {
    setView('MAIN');
    setEditingPlace(null);
  }, [setView]);

  useBack(view, handleBack);

  const handleNavigate = useCallback((v: ViewType, p?: Place) => {
    setView(v);
    if (p) setEditingPlace(p);
  }, [setView]);

  const handleSave = useCallback((updated: Place) => {
    savePlace(updated);
    handleBack();
  }, [savePlace, handleBack]);

  const handleDelete = useCallback((id: string) => {
    deleteFavorite(id);
    handleBack();
  }, [deleteFavorite, handleBack]);

  const renderDetail = useMemo(() => {
    switch (view) {
      case 'EDIT_HOME':
        return home && <PlaceSetting place={home} onBack={handleBack} onSave={handleSave} />;
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
  }, [view, home, editingPlace, handleBack, handleSave, handleDelete]);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-white dark:bg-makcha-navy-900">
      <SettingPanel 
        view={view}
        onNavigate={handleNavigate}
      />
      <SettingBg view={view}>
        {renderDetail}
      </SettingBg>
    </div>
  );
}