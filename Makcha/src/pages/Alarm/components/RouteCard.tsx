import type { AlarmRoute } from "../types/alarm";
import { ROUTE_TYPE_LABEL } from "../constants"; 

type Props = {
    route: AlarmRoute;
    onSelect: (route: AlarmRoute) => void;
};

const Badge = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="rounded-full border px-3 py-1 text-[13px] text-gray-600 dark:text-white/70 dark:border-makcha-navy-700">
            {children}
        </span>
    );
};

const RouteCard = ({ route, onSelect }: Props) => {
    return (
        <button
            type="button"
            onClick={() => onSelect(route)}
            className="
                w-full h-[178px]
                rounded-[20px]
                border border-gray-200
                bg-white
                px-[14px] py-[15px]
                text-left
                shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                hover:bg-gray-50 dark:hover:bg-makcha-navy-800/30
                dark:border-makcha-navy-800 dark:bg-makcha-navy-900
                flex flex-col
                max-md:h-auto max-md:px-4 max-md:pt-4 max-md:pb-3
            "
        >
            {/* 상단 */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                    {route.isOptimal ? <Badge>최적</Badge> : <Badge>{ROUTE_TYPE_LABEL[route.routeType]}</Badge>}

                    {route.lines.map((l) => (
                        <Badge key={l}>{l}</Badge>
                    ))}
                </div>

                <div className="flex items-center gap-1 text-[14px] text-gray-500 dark:text-white/50">
                    <span>상세보기</span>
                    <span className="text-[18px] leading-none">›</span>
                </div>
            </div>

            {/* 가운데 */}
            <div className="flex flex-1 flex-col items-center justify-center text-center max-md:py-6">
                <div className="text-[30px] font-bold text-gray-900 leading-tight dark:text-white">
                    {route.departureTime} 출발
                </div>
                <div className="mt-[4px] text-[16px] text-gray-900 dark:text-white/80">
                    {route.timeUntilDeparture}
                </div>
            </div>

            {/* 하단 */}
            <div className="border-t border-gray-200 pt-3 dark:border-makcha-navy-800">
                <div className="flex items-center justify-center gap-8 text-[14px] text-gray-500 dark:text-white/60 max-md:grid max-md:grid-cols-3 max-md:text-center max-md:text-[13px] max-md:gap-0">
                    <span>총 {route.totalDurationMin}분 소요</span>
                    <span>환승 {route.transferCount}회</span>
                    <span>도보 {route.walkingTimeMin}분</span>
                </div>
            </div>
        </button>
    );
};

export default RouteCard;
