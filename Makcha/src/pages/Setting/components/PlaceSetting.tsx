import { useState, useCallback, memo, useEffect } from "react";
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

  const { addToast } = useToastStore();
  
  const isHome = place.id === 'home';
  const canDelete = !isHome && onDelete; 

  useEffect(() => { setTemp(place); }, [place]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTemp((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddressSelect = (result: SearchResult) => {
    setTemp((prev) => ({
      ...prev,
      provider_place_id: result.id,
      place_address: result.address,
      place_detail_address: '',
      latitude: result.latitude,
      longitude: result.longitude,
    }));
    setIsSearching(false);
  };

  const handleSubmit = async (e: FormEvent) => {
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
  };

  const handleDelete = async () => {
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
  };

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
            onClick={handleDelete} 
            disabled={isSubmitting}
            className="p-1 text-red-400 hover:text-red-500 disabled:opacity-50"
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
          className="w-full rounded-xl border border-gray-400 py-4 font-bold text-gray-600 hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-white/10 transition-all md:border-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "저장 중..." : "설정 저장하기"}
        </button>
      }
    >
      <form id="place-setting-form" onSubmit={handleSubmit} className="space-y-8">
        
        <section>
          <label className="mb-2 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">주소</label>
          <div className="flex items-center justify-between gap-2 font-medium text-gray-900 dark:text-white">
            <span className={`truncate text-base ${!temp.place_address && 'text-gray-400'}`}>
              {temp.place_address || '주소를 검색해주세요'}
            </span>
            <button 
              type="button" 
              disabled={isSubmitting}
              className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-xs font-bold dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors" 
              onClick={() => setIsSearching(true)}
            >
              검색
            </button>
          </div>
        </section>

        <section>
          <label className="mb-2 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">상세 주소 (선택)</label>
          <input 
            name="place_detail_address" 
            value={temp.place_detail_address || ''} 
            onChange={handleChange} 
            disabled={isSubmitting}
            placeholder="예: 101동 203호" 
            className="w-full rounded-2xl bg-gray-100 p-4 outline-none dark:bg-makcha-navy-800 dark:text-white placeholder:text-gray-400" 
          />
        </section>
      </form>
    </SubPanel>
  );
});

PlaceSetting.displayName = "PlaceSetting";
export default PlaceSetting;