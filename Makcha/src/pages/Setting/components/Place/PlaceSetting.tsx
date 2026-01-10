import { useState, useCallback, memo, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Trash2 } from "lucide-react";
import type { Place, PlaceSettingProps } from "../../../../types/setting";
import SubPanel from "../../../../components/common/Panel/SubPanel";

const PlaceSetting = memo(({ place, onBack, onSave, onDelete }: PlaceSettingProps) => {
  const [temp, setTemp] = useState<Place>(place);
  const isHome = place.id === 'home';

  useEffect(() => {
    setTemp(place);
  }, [place]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTemp((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(temp);
  };

  return (
    <SubPanel
      isOpen={true} 
      onBack={onBack}
      title={isHome ? '집 설정' : '장소 편집'}
      rightAction={
        !isHome && (
          <button 
            type="button" 
            onClick={() => {
               onDelete?.(place.id);
            }} 
            className="p-1 text-red-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        )
      }
    >
      <form onSubmit={handleSubmit} className="flex h-full flex-col">
        <div className="flex-1 space-y-8">
          {!isHome && (
            <section>
              <label className="mb-2 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">
                장소 별칭
              </label>
              <input 
                type="text" 
                name="name"
                value={temp.name} 
                onChange={handleChange} 
                autoFocus
                placeholder="장소의 이름을 입력해주세요"
                className="w-full border-b border-gray-200 bg-transparent pb-2 text-lg font-medium outline-none transition-colors focus:border-blue-500 dark:border-white/10 dark:text-white" 
              />
            </section>
          )}

          <section>
            <label className="mb-2 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">주소</label>
            <div className="flex items-center justify-between gap-2 font-medium text-gray-900 dark:text-white">
              <span className="truncate text-base">{temp.address || '미등록'}</span>
              <button 
                type="button"
                className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-gray-500 hover:bg-blue-600 hover:text-white dark:bg-white/10 dark:text-makcha-navy-300 dark:hover:bg-blue-500 dark:hover:text-white transition-all"
                onClick={() => {/* 주소 검색 로직 연결 */}}
              >
                변경
              </button>
            </div>
          </section>

          <section>
            <label className="mb-2 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">상세 주소</label>
            <input 
              type="text" 
              name="detail"
              value={temp.detail || ''} 
              onChange={handleChange} 
              placeholder="상세 주소 입력 (동, 호수 등)"
              className="w-full rounded-2xl bg-gray-100 p-4 outline-none ring-blue-500/50 focus:ring-1 dark:bg-makcha-navy-800 text-gray-900 dark:text-white placeholder:text-gray-400" 
            />
          </section>
        </div>

        <div className="mt-10 pb-10 md:pb-0">
          <button 
            type="submit"
            className="w-full rounded-xl border border-gray-400 py-4 font-medium text-gray-600 hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-white/10 transition-all"
          >
            설정 저장하기
          </button>
        </div>
      </form>
    </SubPanel>
  );
});

PlaceSetting.displayName = "PlaceSetting";
export default PlaceSetting;