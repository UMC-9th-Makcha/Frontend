import { useState } from 'react';
import blueblur from '../../../assets/blue-blur.svg'
import yellowblur from '../../../assets/yellow-blur.svg'
import type { DirectionSummaryProps } from '../../../types/walking-direction'
import { mockOrigins } from '../common/mock';
import { InputDropdown } from '../common/InputDropdown';

export const DirectionSearch = ({origin, destination, onSubmitOrigin} : DirectionSummaryProps) => {
  const [value, setValue] = useState<string>("");
  const [dropdown,setDropdown] = useState<boolean>(false);
  //검색 결과 없어요 창 띄우는 용도
  const [submitted, setSubmitted] = useState<boolean>(false);

  const filtered = mockOrigins.filter(v => v.includes(value) && value.trim().length > 0);
  const showNoResult = submitted && dropdown && filtered.length === 0;
  
  return (
    <section className='mt-4 mb-4'>
      <dl className="relative rounded-[20px] bg-white shadow-[0_0_4px_0_#88888840] text-[14px] text-[#5F5F5F] font-light
      dark:bg-makcha-navy-900 dark:text-makcha-navy-200">
        <div className="flex items-center px-4 py-3 gap-2">
          <dt className="sr-only">출발지</dt>
          <img src={blueblur} alt="" aria-hidden className="w-4 h-4" />
          <dd className="flex-1 min-w-0">
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setDropdown(true);
                setSubmitted(false);
              }}
              placeholder={`현위치 : ${origin}`}
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
              className="w-full bg-transparent border-0 p-0 m-0 outline-none text-[14px] text-[#5F5F5F] font-light truncate
              dark:text-makcha-navy-200 placeholder:text-[#5F5F5F] placeholder:font-light dark:placeholder:text-makcha-navy-200"
            />
          </dd>
        </div>
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
        <hr className="text-[#DCDCDC] dark:text-makcha-navy-800" />
        <div className="flex items-center px-4 py-3 gap-2">
          <dt className="sr-only">도착지</dt>
          <img src={yellowblur} alt="" aria-hidden className="w-4 h-4" />
          <dd>{destination}</dd>
        </div>
      </dl>
    </section>

  )
}
