import { Search, Circle } from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import { InputDropdown } from "../common/InputDropdown";
import type { StartLocationSearchProps } from "../../../types/waitingspot";

export const StartLocationSearch = ({value,onChangeValue,items,loading,error,onSelect}: StartLocationSearchProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [dropdown, setDropdown] = useState(false);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const names = useMemo(() => items.map((x) => x.name), [items]);

  const showNoResult = dropdown && !loading && !error && value.trim().length > 0 && items.length === 0;

  const handleSelectByName = (name: string) => {
    const picked = items.find((x) => x.name === name);
    if (!picked) return;
    onSelect(picked);
    onChangeValue(picked.name);
    setDropdown(false);
  };

  return (
    <div 
    role="search"
    ref={wrapperRef}
    className="flex flex-col w-full py-1 px-2 gap-2">
      <label
        htmlFor="start-location"
        className="text-[#262626] text-[14px] mt-4 hidden md:flex
        dark:text-white">
        출발지
      </label>
      <div className='relative flex-1'>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4">
          <div className="absolute inset-0 bg-blue-400 rounded-full blur-[2px] opacity-60" />
          <Circle className="relative w-2 h-2 fill-blue-600 text-blue-600" />
        </div>

        <input
          id="start-location"
          value={value}
          onChange={(e) => {
            onChangeValue(e.target.value);
            setDropdown(true);
          }}
          onFocus={() => setDropdown(true)}
          placeholder="현위치"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setDropdown(true);
              }
            }
          }
          className="w-full h-[42px] px-2 pl-10 bg-white shadow-[0_0_5px_0_#88888840] rounded-[20px] text-[#5F5F5F] font-light text-sm outline-none
          placeholder:text-[#5F5F5F] placeholder:font-light placeholder:text-sm placeholder:opacity-100
          dark:placeholder-makcha-navy-200"
        />

        <button
          type="button"
          aria-label="출발지 검색"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full"
          onClick={() => {
            setDropdown(true);
            if (!loading && !error && items.length > 0) {
              const first = items[0];
              onSelect(first);
              onChangeValue(first.name);
              setDropdown(false);
            }
          }}
        >
          <Search className='w-5 h-5 text-[#5F5F5F]
          dark:text-makcha-navy-400'/>
        </button>

        <InputDropdown
          open={dropdown && value.trim().length > 0}
          showNoResult={showNoResult}
          items={names}
          onSelect={handleSelectByName}
        />
      </div>
    </div>
  );
};
