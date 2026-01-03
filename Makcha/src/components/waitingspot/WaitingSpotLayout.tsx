type WaitingSpotLayoutProps = {
  header: React.ReactNode;
  controls: React.ReactNode;
  map: React.ReactNode;
  search: React.ReactNode;
  list: React.ReactNode;
}

export const WaitingSpotLayout = ({header, controls, map, search, list} : WaitingSpotLayoutProps) => {
  return (
    <div className="relative h-full min-h-0 min-w-0 flex">
      {/* map */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full">
          {map}
        </div>
      </div>

      {/* aside */}
      <aside className="relative z-10 h-full w-[400px] shrink-0 bg-white border-r">
        <div className="h-full overflow-y-auto p-[20px]">
          <div>
            {header}
          </div>
          <div>
            {search}
          </div>
          <div>
            {controls}
          </div>
          <div className="mt-5">
            {list}
          </div>
        </div>
      </aside>
    </div>
  )
}
