import type { WaitingSpotLayoutProps } from "../../../types/waitingspot"

export const WaitingSpotLayout = ({header, controls, map, search, list, detail} : WaitingSpotLayoutProps) => {
  return (
    <div className="relative h-full min-h-0 min-w-0 flex">
      {/* map */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full hidden md:block">
          {map}
        </div>
      </div>

      {/* aside */}
      <aside 
      className="md:relative md:shadow-[5px_0px_15px_0px_#88888859] md:w-100 md:shrink-0 md:top-0 md:h-full
      fixed top-21 bottom-0 inset-x-0 z-10 w-full bg-white
      dark:bg-makcha-navy-900">
        <div className="md:block h-full overflow-y-auto p-4">
          <div>
            {header}
          </div>
          <div>
            {search}
          </div>
          <div>
            {controls}
          </div>
          <div>
            {list}
          </div>
        </div>
        {detail && (
          <div className="absolute top-1/2 -translate-y-1/2 left-full ml-6">
            {detail}
          </div>
        )}
      </aside>

    </div>
  )
}
