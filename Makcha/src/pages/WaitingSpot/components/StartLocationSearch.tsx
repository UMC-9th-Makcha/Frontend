import { Search, Circle } from 'lucide-react'
import { useState } from 'react';
import { mockOrigins } from '../common/mock';
import { InputDropdown } from '../common/InputDropdown';

type StartLocationSearchProps  = {
  onSubmitOrigin:(value: string) => void;
}
export const StartLocationSearch = ({onSubmitOrigin} : StartLocationSearchProps ) => {
  const [value, setValue] = useState<string>("");
    const [dropdown,setDropdown] = useState<boolean>(false);
    //검색 결과 없어요 창 띄우는 용도
    const [submitted, setSubmitted] = useState<boolean>(false);
  
    const filtered = mockOrigins.filter(v => v.includes(value) && value.trim().length > 0);
    const showNoResult = submitted && dropdown && filtered.length === 0;
  return (
    <form 
    role="search"
    onSubmit={(e) => e.preventDefault()}
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
        value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setDropdown(true);
                setSubmitted(false);
              }}
              placeholder="현위치"
              onBlur={() => setTimeout(() => setDropdown(false), 100)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSubmitted(true);
                  setDropdown(true);

                  if(filtered.length > 0) {
                    onSubmitOrigin?.(value);
                    setDropdown(false);
                  }
                }
              }}
          id="start-location"
          className="w-full h-[42px] px-2 pl-10 bg-white shadow-[0_0_5px_0_#88888840] rounded-[20px] text-[#5F5F5F] font-light text-sm outline-none
          placeholder:text-[#5F5F5F] placeholder:font-light placeholder:text-sm placeholder:opacity-100
          dark:placeholder-makcha-navy-200"
        />
        <button
          type="button"
          aria-label="출발지 검색"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full"
        >
          <Search className='w-5 h-5 text-[#5F5F5F]
          dark:text-makcha-navy-400'/>
        </button>
        <InputDropdown
          open={dropdown && value.trim().length > 0}
          showNoResult={showNoResult}
          items={filtered}
          onSelect={(item) => {
            setValue(item);
            onSubmitOrigin?.(item);
            setDropdown(false);
          }}
        />
      </div>
    </form>
  )
}