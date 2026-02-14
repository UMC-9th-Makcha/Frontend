import { useEffect, useMemo, useRef, useState } from 'react';
import { Circle } from 'lucide-react'; 
import type { DirectionSummaryProps } from '../types/walking-direction'
import { InputDropdown } from '../common/InputDropdown';

export const DirectionSearch = ({origin, destination, value, onChangeValue, items, loading, error, onSelect} : DirectionSummaryProps) => {

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [dropdown,setDropdown] = useState<boolean>(false);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const names = useMemo(() => items.map((x) => x.name), [items]);

  const showNoResult =
  dropdown &&
  !loading &&
  !error &&
  value.trim().length > 0 &&
  items.length === 0;

  const handleSelectByName = (name: string) => {
    const picked = items.find((x) => x.name === name);
    if (!picked) return;

    onSelect(picked);
    onChangeValue(picked.name);
    setDropdown(false);
  };

  return (
    <section className='mt-4 mb-4'>
      <dl className="relative rounded-[20px] bg-white shadow-[0_0_4px_0_#88888840] text-[14px] text-[#5F5F5F] font-light
      dark:bg-makcha-navy-900 dark:text-makcha-navy-200">
        <div className="flex items-center px-4 py-3 gap-2">
          <dt className="sr-only">출발지</dt>
          <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-[2px] opacity-60" />
            <Circle className="relative w-2 h-2 fill-blue-600 text-blue-600" />
          </div>
          <dd className="flex-1 min-w-0">
            <input
              value={value}
              onChange={(e) => {
                onChangeValue(e.target.value);
                setDropdown(true);
              }}
              onFocus={() => setDropdown(true)}
              placeholder={`${origin}`}
              className="w-full bg-transparent border-0 p-0 m-0 outline-none text-[14px] text-[#5F5F5F] font-light truncate
              dark:text-makcha-navy-200 placeholder:text-[#5F5F5F] placeholder:font-light dark:placeholder:text-makcha-navy-200"
            />
          </dd>
        </div>
        <InputDropdown
          open={dropdown && value.trim().length > 0}
          showNoResult={showNoResult}
          items={names}
          onSelect={handleSelectByName}
        />
        <hr className="text-[#DCDCDC] dark:text-makcha-navy-800" />
        <div className="flex items-center px-4 py-3 gap-2">
          <dt className="sr-only">도착지</dt>
          <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
            <div className="absolute inset-0 bg-makcha-yellow-400 rounded-full blur-[2px] opacity-60" />
            <Circle className="relative w-3 h-3 fill-makcha-yellow-600 text-makcha-yellow-600" />
          </div>
          <dd className="truncate">{destination}</dd>
        </div>
      </dl>
    </section>
  )
}