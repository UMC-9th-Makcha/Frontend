import { Search } from 'lucide-react'
import blueblur from '../../assets/blue-blur.svg'

export const StartLocationSearch = () => {
  return (
    <form 
    role="search"
    className="flex flex-col w-full py-1 px-2 gap-2">
      <label
        htmlFor="start-location"
        className="text-[#262626] text-[14px] mt-4
        dark:text-white">
        출발지
      </label>
      <div className='relative flex-1'>
        <img src={blueblur} 
        alt="" 
        aria-hidden 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
        <input
          id="start-location"
          placeholder="현위치"
          className="w-full h-[42px] px-2 pl-10 shadow-[0_0_5px_0_#88888840] rounded-[20px]
          placeholder:text-gray-600 placeholder:font-light placeholder:text-sm placeholder:opacity-100
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
      </div>
    </form>
  )
}
