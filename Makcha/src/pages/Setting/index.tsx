import { useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SettingPanel } from "./components/SettingPanel";
import { SettingBg } from "./components/BgSection";
import { useSettingStore } from "../../store/useSettingStore";
import { useBack } from "./hooks/useBack";
import type { Place } from "./types/setting";
import { DEFAULT_HOME, type ViewType } from "./constants";
import PlaceSetting from "./components/PlaceSetting";
import { PhonenumberSetting } from "./components/PhonenumberSetting";

export default function Setting() {
  const navigate = useNavigate();
  const location = useLocation();
  const view = useSettingStore((state) => state.view);
  const setView = useSettingStore((state) => state.setView);
  const home = useSettingStore((state) => state.home);
  const savePlace = useSettingStore((state) => state.savePlace);
  const deletePlace = useSettingStore((state) => state.deletePlace);

  const [editingPlace, setEditingPlace] = useState<Place | null>(null);

  const navState = location.state as { from?: string; returnTo?: string } | undefined;
  const isFromAlarm = navState?.from === "ALARM_SMS";
  const returnTo = navState?.returnTo ?? "/alarm";

  const handleBack = useCallback(() => {
    setView("MAIN");
    setEditingPlace(null);
  }, [setView]);

  useBack(view, handleBack);

  const handleNavigate = useCallback((v: ViewType, p?: Place) => {
    setView(v);
    if (p) setEditingPlace(p);
  }, [setView]);

  const handleContactComplete = useCallback((payload?: { phone: string }) => {
    const phone = payload?.phone ?? "";
    if (isFromAlarm) {
      navigate(returnTo, { replace: true, state: { smsVerified: true, phone } });
      return;
    }
    handleBack();
  }, [isFromAlarm, navigate, returnTo, handleBack]);

  const detailView = useMemo(() => {
    const safeHome = home ?? DEFAULT_HOME;

    const props = {
      onBack: handleBack,
      onSave: async (p: Place) => {
        await savePlace(p);
      },
    };

    switch (view) {
      case "EDIT_HOME":
        return (
          <PlaceSetting 
            place={safeHome}
            {...props} 
            onDelete={async (id) => {
                await deletePlace(id);
            }}
          />
        );

      case "EDIT_FAVORITE":
        return editingPlace ? (
          <PlaceSetting
            {...props}
            place={editingPlace}
            onDelete={async (id) => {
              await deletePlace(id);
            }}
          />
        ) : null;

      case "EDIT_CONTACT":
        return (
          <PhonenumberSetting
            onBack={handleBack}
            onComplete={handleContactComplete}
          />
        );

      default:
        return null;
    }
  }, [view, home, editingPlace, handleBack, savePlace, deletePlace, handleContactComplete]);

  return (
    <div className="h-dvh w-full flex overflow-hidden bg-white dark:bg-makcha-navy-900">
      <SettingPanel view={view} onNavigate={handleNavigate} />

      <div className="flex-1 h-full relative overflow-hidden">
        <SettingBg view={view}>{detailView}</SettingBg>
      </div>
    </div>
  );
}