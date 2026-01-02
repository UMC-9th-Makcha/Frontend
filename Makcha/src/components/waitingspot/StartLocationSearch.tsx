export const StartLocationSearch = () => {
  return (
    <form role="search">
      <label htmlFor="start-location">
        출발지
      </label>
      <input
        id="start-location"
        type="search"
        placeholder="현위치"
        className="w-[360px] h-[40px] shadow-[0_0_5px_0_#88888840] rounded-[20px]"
      />
      <button type="button">
      </button>
    </form>
  )
}
