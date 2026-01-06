export const StartLocationSearch = () => {
  return (
    <form 
    role="search"
    className="flex flex-col w-full py-1 px-2 gap-2">
      <label
        htmlFor="start-location"
        className="text-[#262626] text-base
        dark:text-white">
        출발지
      </label>
      <input
        id="start-location"
        placeholder="현위치"
        className="w-full h-10 px-2 placeholder-[#5F5F5F] shadow-[0_0_5px_0_#88888840] rounded-[20px]
        dark:placeholder-makcha-navy-200"
      />
      <button type="button">
      </button>
    </form>
  )
}
