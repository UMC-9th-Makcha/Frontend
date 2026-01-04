import { useState, useCallback, memo } from "react";
// verbatimModuleSyntax 대응: 타입은 'import type'으로 명시
import type { ChangeEvent, FormEvent } from "react";
import { ChevronLeft, Trash2 } from "lucide-react";
import type { Place, PlaceSettingProps } from "../../types/setting";

const PlaceSetting = memo(({ place, onBack, onSave, onDelete }: PlaceSettingProps) => {
  const [temp, setTemp] = useState<Place>(place);
  const isHome = place.id === 'home';

  // 입력값 변경 핸들러: useCallback으로 재생성 방지
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTemp((prev) => ({ ...prev, [name]: value }));
  }, []);

  // 저장 핸들러: form submit 이벤트 대응
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지
    onSave(temp);
  }, [onSave, temp]);

  // 삭제 핸들러
  const handleDelete = useCallback(() => {
    if (!place?.id) return;
  
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete?.(place.id);
    }
  }, [onDelete, place]);

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col overflow-hidden bg-white transition-all duration-300 dark:bg-makcha-navy-900 md:h-auto md:max-h-[820px] md:max-w-[440px] md:rounded-[40px] md:shadow-2xl"
    >
      {/* 헤더 섹션 */}
      <header className="flex shrink-0 items-center justify-between border-b border-gray-50 px-6 py-4 dark:border-makcha-navy-800 md:py-6">
        <button type="button" onClick={onBack} className="p-1" aria-label="뒤로 가기">
          <ChevronLeft size={24} className="dark:text-white" />
        </button>
        
        <h2 className="text-[18px] font-bold dark:text-white md:text-[20px]">
          {isHome ? '집 설정' : '장소 편집'}
        </h2>

        {!isHome ? (
          <button 
            type="button"
            onClick={handleDelete} 
            className="p-1 text-red-400 transition-transform active:scale-90"
            aria-label="장소 삭제"
          >
            <Trash2 size={20} />
          </button>
        ) : (
          <div className="w-8" />
        )}
      </header>

      {/* 메인 폼 섹션 */}
      <main className="no-scrollbar flex flex-1 flex-col overflow-y-auto bg-white p-6 dark:bg-makcha-navy-900 md:p-8">
        <div className="flex-1 space-y-8">
          {/* 장소 별칭 */}
          {!isHome && (
            <section>
              <label className="mb-2 block text-xs font-bold uppercase text-gray-400">장소 별칭</label>
              <input 
                type="text" 
                name="name"
                value={temp.name} 
                onChange={handleChange} 
                autoFocus
                className="w-full border-b border-gray-100 bg-transparent pb-2 text-lg font-medium outline-none transition-colors focus:border-blue-500 dark:border-makcha-navy-800 dark:text-white" 
              />
            </section>
          )}

          {/* 주소 정보 */}
          <section>
            <label className="mb-2 block text-xs font-bold uppercase text-gray-400">주소</label>
            <div className="flex items-center justify-between gap-2 font-medium dark:text-white">
              <span className="truncate text-base">{temp.address || '미등록'}</span>
              <button 
                type="button"
                className="shrink-0 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-500 transition-transform active:scale-95 dark:bg-blue-900/30"
              >
                변경
              </button>
            </div>
          </section>

          {/* 상세 주소 입력 */}
          <section>
            <label className="mb-2 block text-xs font-bold uppercase text-gray-400">상세 주소</label>
            <input 
              type="text" 
              name="detail"
              value={temp.detail} 
              onChange={handleChange} 
              placeholder="상세 주소 입력"
              className="w-full rounded-2xl bg-gray-50 p-4 outline-none transition-all ring-blue-500/50 focus:ring-1 dark:bg-makcha-navy-800 dark:text-white" 
            />
          </section>
        </div>

        {/* 하단 저장 버튼 */}
        <div className="mt-10 pb-10 md:pb-0">
          <button 
            type="submit"
            className="w-full rounded-3xl bg-blue-600 py-5 font-bold text-white shadow-xl transition-all active:scale-[0.98]"
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