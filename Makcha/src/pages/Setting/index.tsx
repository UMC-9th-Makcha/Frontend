import { useState, useCallback, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SettingPanel } from "./components/SettingPanel";
import { useBack } from "./hooks/useBack";
import type { Place } from "./types/setting";
import { DEFAULT_HOME, type ViewType } from "./constants";
import PlaceSetting from "./components/PlaceSetting";
import { PhonenumberSetting } from "./components/PhonenumberSetting";
import { usePlaceSetting } from "./hooks/usePlaceSetting";
import { SettingBg } from "./components/SectionBg";

/** * 상세 뷰 렌더링을 담당하는 내부 컴포넌트
 * 부모의 리렌더링 영향을 최소화하기 위해 분리
 */
const DetailContent = memo(({
  view,
  home,
  editingPlace,
  onBack,
  onSave,
  onDelete,
  onContactComplete,
}: {
  view: ViewType;
  home: Place | null;
  editingPlace: Place | null;
  onBack: () => void;
  onSave: (p: Place) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onContactComplete: (payload?: { phone: string }) => void;
}) => {
  const safeHome = home ?? DEFAULT_HOME;

  switch (view) {
    case "EDIT_HOME":
      return (
        <PlaceSetting 
          place={safeHome} 
          onBack={onBack} 
          onSave={onSave} 
          onDelete={onDelete} 
        />
      );

    case "EDIT_FAVORITE":
      if (!editingPlace) return null;
      return (
        <PlaceSetting 
          place={editingPlace} 
          onBack={onBack} 
          onSave={onSave} 
          onDelete={onDelete} 
        />
      );

    case "EDIT_CONTACT":
      return (
        <PhonenumberSetting 
          onBack={onBack} 
          onComplete={onContactComplete} 
        />
      );

    default:
      return null;
  }
});

DetailContent.displayName = 'DetailContent';

export default function Setting() {
  const navigate = useNavigate();
  const location = useLocation();

  const [view, setView] = useState<ViewType>("MAIN");
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  
  // usePlaceSetting 내에서 mutateAsync를 반환하도록 수정되어야 함
  const { home, savePlace, deletePlace } = usePlaceSetting();

  const navState = location.state as { from?: string; returnTo?: string } | undefined;
  const isFromAlarm = navState?.from === "ALARM_SMS";
  const returnTo = navState?.returnTo ?? "/alarm";

  const handleBack = useCallback(() => {
    setView("MAIN");
    setEditingPlace(null);
  }, []);

  useBack(view, handleBack);

  const handleNavigate = useCallback((v: ViewType, p?: Place) => {
    setView(v);
    if (p) setEditingPlace(p);
  }, []);

  const handleContactComplete = useCallback((payload?: { phone: string }) => {
    if (isFromAlarm) {
      const phone = payload?.phone ?? "";
      navigate(returnTo, { replace: true, state: { smsVerified: true, phone } });
    } else {
      handleBack();
    }
  }, [isFromAlarm, navigate, returnTo, handleBack]);

  return (
    <div className="h-dvh w-full flex overflow-hidden bg-white dark:bg-makcha-navy-900">
      <SettingPanel view={view} onNavigate={handleNavigate} />

      <div className="flex-1 h-full relative overflow-hidden">
        <SettingBg view={view}>
          <DetailContent
            view={view}
            home={home}
            editingPlace={editingPlace}
            onBack={handleBack}
            onSave={savePlace}
            onDelete={deletePlace}
            onContactComplete={handleContactComplete}
          />
        </SettingBg>
      </div>
    </div>
  );
}