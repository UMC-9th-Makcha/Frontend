export const StartLocationSearch = () => {
  return (
    <form role="search">
      <label
        htmlFor="start-location"
        className="text-[#262626]
        dark:text-white">
        출발지
      </label>
      <input
        id="start-location"
        placeholder="현위치"
        className="w-[360px] h-[40px]  px-2 placeholder-[#5F5F5F] shadow-[0_0_5px_0_#88888840] rounded-[20px]
        dark:placeholder-makcha-navy-200"
      />
      <button type="button">
      </button>
    </form>
  )
}
