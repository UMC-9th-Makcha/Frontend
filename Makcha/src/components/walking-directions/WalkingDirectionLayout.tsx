import type { WaitingSpotLayoutProps } from "../../types/waitingspot"

export const WalkingDirectionLayout = ({header, controls, map, search, list, detail, footer}: WaitingSpotLayoutProps) => {
  return (
    <div className="relative h-dvh w-full">
      {/* map */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full hidden md:block">{map}</div>
      </div>

      <aside
        className="md:relative md:shadow-[5px_0px_15px_0px_#88888859] md:w-100 md:shrink-0 md:top-0 md:h-dvh
          relative inset-x-0 z-10 w-full h-full bg-white dark:bg-makcha-navy-900"
      >
        <div className="h-full overflow-y-auto">
          <div className="min-h-full flex flex-col p-4">
            <div>
              {header}
              {search}
              {controls}
              {list}
            </div>
            {footer && (
              <div className="mt-auto mb-30">
                {footer}
              </div>
            )}
          </div>
        </div>

        {detail && (
          <div className="absolute top-1/2 -translate-y-1/2 left-full ml-6">
            {detail}
          </div>
        )}
      </aside>
    </div>
  );
};
