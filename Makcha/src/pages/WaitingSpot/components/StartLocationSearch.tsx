import { Search } from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import { InputDropdown } from "../common/InputDropdown";
import type { StartLocationSearchProps } from "../types/waitingspot";

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
    className="flex flex-col w-full gap-2">
      <label
        htmlFor="start-location"
        className="text-gray-900 text-small mt-4 hidden md:flex
        dark:text-white">
        출발지
      </label>
      <div className='relative flex-1'>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4">
          <span className="absolute inset-0 rounded-full bg-makcha-navy-400 opacity-60 blur-[4px]" />
          <span className="absolute inset-1 rounded-full bg-makcha-navy-600" />
        </span>

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
          className="w-full h-[42px] pr-4 pl-10 bg-white border border-gray-200 shadow-sm rounded-[30px] 
          text-gray-600 font-light text-sm outline-none
          placeholder:text-gray-600 placeholder:font-light placeholder:text-small
          dark:border-makcha-navy-700 dark:bg-makcha-navy-900 dark:placeholder-makcha-navy-200"
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
          <Search
            className='w-5 h-5 text-gray-500 -translate-x-1/4
          dark:text-makcha-navy-400'
            strokeWidth={2}
          />
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
