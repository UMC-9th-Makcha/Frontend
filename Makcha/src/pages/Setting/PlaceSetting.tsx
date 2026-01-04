import { useState, useCallback, memo } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ChevronLeft, Trash2 } from "lucide-react";
import type { Place, PlaceSettingProps } from "../../types/setting";

const PlaceSetting = memo(({ place, onBack, onSave, onDelete }: PlaceSettingProps) => {
  const [temp, setTemp] = useState<Place>(place);
  const isHome = place.id === 'home';

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTemp((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSave(temp);
  }, [onSave, temp]);

  const handleDelete = useCallback(() => {
    if (!place?.id) return;
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete?.(place.id);
    }
  }, [onDelete, place]);

  return (
    <form 
      onSubmit={handleSubmit}
      className={`
        flex h-full w-full flex-col overflow-hidden transition-all duration-300
        bg-white dark:bg-makcha-navy-900 
        md:h-auto md:max-h-[820px] md:max-w-[440px] md:rounded-[40px] md:shadow-2xl
        md:border md:border-gray-100 dark:md:border-white/5
      `}
    >
      <header className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-white/5 md:py-6">
        <button type="button" onClick={onBack} className="p-1 transition-transform active:scale-90" aria-label="뒤로 가기">
          <ChevronLeft size={24} className="text-gray-900 dark:text-white" />
        </button>
        
        <h2 className="text-[18px] font-bold text-gray-900 dark:text-white md:text-[20px]">
          {isHome ? '집 설정' : '장소 편집'}
        </h2>

        {!isHome ? (
          <button 
            type="button"
            onClick={handleDelete} 
            className="p-1 text-red-400 transition-colors hover:text-red-500 active:scale-90"
            aria-label="장소 삭제"
          >
            <Trash2 size={20} />
          </button>
        ) : (
          <div className="w-8" />
        )}
      </header>

      <main className="no-scrollbar flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
        <div className="flex-1 space-y-8">
          {!isHome && (
            <section>
              <label className="mb-2 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">장소 별칭</label>
              <input 
                type="text" 
                name="name"
                value={temp.name} 
                onChange={handleChange} 
                autoFocus
                className="w-full border-b border-gray-200 bg-transparent pb-2 text-lg font-medium outline-none transition-colors focus:border-blue-500 dark:border-white/10 dark:text-white" 
              />
            </section>
          )}

          <section>
            <label className="mb-2 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">주소</label>
            <div className="flex items-center justify-between gap-2 font-medium text-gray-900 dark:text-white">
              <span className="truncate text-base">{temp.address || '미등록'}</span>
              
              {/* 수정된 '변경' 버튼 */}
              <button 
                type="button"
                className={`
                  shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all active:scale-95
                  bg-gray-100 text-gray-500 hover:bg-blue-600 hover:text-white
                  dark:bg-white/10 dark:text-makcha-navy-300 dark:hover:bg-blue-500 dark:hover:text-white
                `}
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
              value={temp.detail} 
              onChange={handleChange} 
              placeholder="상세 주소 입력"
              className="w-full rounded-2xl p-4 outline-none transition-all ring-blue-500/50 focus:ring-1 bg-gray-100 dark:bg-makcha-navy-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-makcha-navy-500" 
            />
          </section>
        </div>

        <div className="mt-10 pb-10 md:pb-0">
          <button 
            type="submit"
            className={`
              w-full rounded-xl py-4 font-medium transition-all
              border border-gray-400 text-gray-600 hover:bg-gray-50
              md:border-2 
              dark:border-white dark:text-white dark:hover:bg-white/10
            `}
          >
            설정 저장하기
          </button>
        </div>
      </main>
    </form>
  );
});

PlaceSetting.displayName = "PlaceSetting";

export default PlaceSetting;