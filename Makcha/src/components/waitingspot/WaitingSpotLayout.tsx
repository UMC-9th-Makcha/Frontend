import type { WaitingSpotLayoutProps } from "../../types/waitingspot"

export const WaitingSpotLayout = ({header, controls, map, search, list, detail} : WaitingSpotLayoutProps) => {
  return (
    <div className="relative h-full min-h-0 min-w-0 flex">
      {/* map */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full">
          {map}
        </div>
      </div>

      {/* aside */}
      <aside className="relative z-10 h-full w-[400px] shrink-0 bg-white shadow-[5px_0px_15px_0px_#88888859]
      dark:bg-makcha-navy-900">
        <div className="h-full overflow-y-auto p-5">
          <div className="py-1">
            {header}
          </div>
          <div className="py-8">
            {search}
          </div>
          <div>
            {controls}
          </div>
          <div className="mt-5">
            {list}
          </div>
        </div>
        {detail && (
          <div className="absolute top-1/2 -translate-y-1/2 left-full ml-[26px]">
            {detail}
          </div>
        )}
      </aside>

    </div>
  )
}
