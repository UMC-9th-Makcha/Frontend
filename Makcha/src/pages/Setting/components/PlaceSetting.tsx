import { useState, useCallback, memo, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Trash2 } from "lucide-react";
import type { Place, PlaceSettingProps } from "../types/setting";
import SubPanel from "../../../components/common/Panel/SubPanel";

const PlaceSetting = memo(({ place, onBack, onSave, onDelete }: PlaceSettingProps) => {
  const [temp, setTemp] = useState<Place>(place);
  const isHome = place.id === 'home';

  useEffect(() => { setTemp(place); }, [place]);

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
      title={'장소 편집'}
      rightAction={
        !isHome && onDelete && (
          <button onClick={() => onDelete(place.id)} className="p-1 text-red-400 hover:text-red-500">
            <Trash2 size={20} />
          </button>
        )
      }
      footer={
        <button 
          type="submit"
          form="place-setting-form"
          className="w-full rounded-xl border border-gray-400 py-4 font-bold text-gray-600 hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-white/10 transition-all md:border-2"
        >
          설정 저장하기
        </button>
      }
    >
      <form id="place-setting-form" onSubmit={handleSubmit} className="space-y-8">
        {!isHome ? (
          <section>
            <label className="mb-2 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">장소 이름</label>
            <input name="name" value={temp.name} onChange={handleChange} autoFocus className="w-full border-b border-gray-200 bg-transparent pb-2 text-lg font-medium outline-none dark:border-white/10 dark:text-white" />
          </section>
        ) : (
          <section><p className="text-lg font-bold px-1">집</p></section>
        )}
        <section>
          <label className="mb-2 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">주소</label>
          <div className="flex items-center justify-between gap-2 font-medium text-gray-900 dark:text-white">
            <span className="truncate text-base">{temp.address || '미등록'}</span>
            <button type="button" className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-xs font-bold dark:bg-white/10" onClick={() => {}}>변경</button>
          </div>
        </section>
        <section>
          <label className="mb-2 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">상세 주소</label>
          <input name="detail" value={temp.detail || ''} onChange={handleChange} placeholder="상세 주소 입력" className="w-full rounded-2xl bg-gray-100 p-4 outline-none dark:bg-makcha-navy-800 dark:text-white" />
        </section>
      </form>
    </SubPanel>
  );
});

PlaceSetting.displayName = "PlaceSetting";
export default PlaceSetting;