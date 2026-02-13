import { useState, useCallback, memo } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Trash2 } from "lucide-react";
import type { Place, PlaceSettingProps } from "../types/setting"; 
import SubPanel from "../../../components/common/Panel/SubPanel";
import AddressSearch from "../../../components/common/AddressSearch";
import type { SearchResult } from "../../../components/common/AddressSearch/types/addressSearch";
import useToastStore from "../../../store/useToastStore"; 

const PlaceSetting = memo(({ place, onBack, onSave, onDelete }: PlaceSettingProps) => {
  const [temp, setTemp] = useState<Place>(place);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToast = useToastStore((state) => state.addToast);
  
  const isHome = place.id === 'home';
  const canDelete = !isHome && !!onDelete; 

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTemp((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddressSelect = useCallback((result: SearchResult) => {
    setTemp((prev) => ({
      ...prev,
      provider_place_id: result.id,
      place_address: result.address,
      place_detail_address: '',
      latitude: result.latitude,
      longitude: result.longitude,
    }));
    setIsSearching(false);
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (!temp.place_address) {
      addToast("주소를 입력해주세요.", "warning");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(temp);
      addToast("장소가 저장되었습니다.", "success");
      onBack(); 
    } catch {
      addToast("저장에 실패했습니다. 다시 시도해주세요.", "error");
      setIsSubmitting(false);
    }
  }, [temp, onSave, onBack, addToast]);

  const handleDeleteClick = useCallback(async () => {
    if (!onDelete) return;
    
    setIsSubmitting(true);
    try {
      await onDelete(place.id);
      addToast("장소가 삭제되었습니다.", "success");
      onBack();
    } catch {
      addToast("삭제에 실패했습니다.", "error");
      setIsSubmitting(false);
    }
  }, [onDelete, place.id, onBack, addToast]);

  if (isSearching) {
    return (
      <SubPanel isOpen={true} onBack={() => setIsSearching(false)} title="주소 검색">
        <AddressSearch onSelect={handleAddressSelect} />
      </SubPanel>
    );
  }

  return (
    <SubPanel
      isOpen={true} 
      onBack={onBack} 
      title={isHome ? '집 설정' : '장소 편집'}
      rightAction={
        canDelete && (
          <button 
            type="button"
            onClick={handleDeleteClick} 
            disabled={isSubmitting}
            className="p-1 text-red-500 hover:text-red-600 disabled:opacity-50 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        )
      }
      footer={
        <button 
          type="submit"
          form="place-setting-form"
          disabled={isSubmitting}
          className="w-full rounded-xl border border-gray-400 py-4 text-body font-bold text-gray-600 hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-white/10 transition-all md:border-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "저장 중..." : "설정 저장하기"}
        </button>
      }
    >
      <form id="place-setting-form" onSubmit={handleSubmit} className="space-y-8 px-1">
        
        {/* 주소 섹션 */}
        <section>
          <label className="mb-3 block text-body font-bold uppercase text-gray-500 dark:text-makcha-navy-300">
            주소
          </label>
          <div className="flex items-center justify-between gap-4">
            <span className={`text-body font-medium truncate ${!temp.place_address ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
              {temp.place_address || '주소를 검색해주세요'}
            </span>
            <button 
              type="button" 
              disabled={isSubmitting}
              className="shrink-0 rounded-full bg-gray-100 px-5 py-2 text-caption font-bold dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" 
              onClick={() => setIsSearching(true)}
            >
              검색
            </button>
          </div>
        </section>

        {/* 상세 주소 섹션 */}
        <section>
          <label className="mb-3 block text-body font-bold uppercase text-gray-500 dark:text-makcha-navy-300">
            상세 주소 (선택)
          </label>
          <input 
            name="place_detail_address" 
            value={temp.place_detail_address ?? ""} 
            onChange={handleChange} 
            disabled={isSubmitting}
            placeholder="예: 101동 203호" 
            className="w-full rounded-2xl bg-gray-100 p-4 text-body outline-none dark:bg-makcha-navy-800 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/20 transition-all" 
          />
        </section>
      </form>
    </SubPanel>
  );
});

PlaceSetting.displayName = "PlaceSetting";
export default PlaceSetting;