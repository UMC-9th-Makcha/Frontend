import SearchIcon from "../../../assets/icons/Search.svg";
import LogoCircle from "../../../assets/icons/Logo-circle.svg";
import type { OriginSearchItem } from "../mocks/originSearchMock";
import type { AlarmRoute } from "../mocks/alarmMock";

type Props = {
    origin: OriginSearchItem | null;
    destination: OriginSearchItem | null;
    routes: AlarmRoute[];
    onSelectRoute: (route: AlarmRoute) => void;
};

const ROUTE_TYPE_LABEL: Record<AlarmRoute["routeType"], string> = {
    SUBWAY: "지하철",
    BUS: "버스",
    NIGHT_BUS: "심야버스",
};

const RouteResultPanelMobile = ({
    origin,
    destination,
    routes,
    onSelectRoute,
}: Props) => {
    return (
        <section className="min-h-dvh w-full bg-white dark:bg-makcha-navy-900 flex flex-col">
            <div className="flex-1 px-5 pt-6 pb-6 overflow-y-auto">
                {/* 타이틀 */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-[40px] font-regular text-[#000000] dark:text-white">
                            알림 선택
                        </h1>
                        <p className="mt-1 text-[20px] leading-5 text-[#5F5F5F] dark:text-white/60">
                            카카오톡으로 받으실 알림을 선택해주세요!
                        </p>
                    </div>
                </div>

                {/* 현위치 */}
                <div className="mt-5 space-y-3">
                    <button
                        type="button"
                        className="flex h-[57px] w-full items-center gap-3 rounded-[16px]
                            border border-gray-200 
                            bg-white 
                            px-4 shadow-sm"
                    >
                        <span className="relative h-4 w-4">
                            <span className="absolute inset-0 rounded-full bg-makcha-navy-400 opacity-60 blur-[4px]" />
                            <span className="absolute inset-1 rounded-full bg-makcha-navy-600" />
                        </span>

                        <p className="flex-1 truncate text-left text-[18px] text-gray-600">
                            {origin ? `출발지 : ${origin.title}` : "출발지"}
                        </p>

                        <img
                            src={SearchIcon}
                            alt="검색"
                            className="h-[25px] w-[25px]"
                        />
                    </button>

                    <button
                        type="button"
                        className="flex h-[57px] w-full items-center gap-3 rounded-[16px]
                            border border-gray-200 bg-white 
                            px-4 shadow-sm"
                    >
                        <span className="relative h-4 w-4">
                            <span className="absolute inset-0 rounded-full bg-makcha-navy-400 opacity-60 blur-[4px]" />
                            <span className="absolute inset-1 rounded-full bg-makcha-navy-600" />
                        </span>

                        <p className="flex-1 truncate text-left text-[18px] text-gray-600">
                            {destination ? `도착지 : ${destination.title}` : "도착지"}
                        </p>

                        <img
                            src={SearchIcon}
                            alt="검색"
                            className="h-[25px] w-[25px]"
                        />
                    </button>
                </div>

                {/* 경로 리스트 */}
                <div className="mt-5 space-y-4">
                    {routes.map((route) => (
                        <button
                            key={route.id}
                            type="button"
                            onClick={() => onSelectRoute(route)}
                            className="
                                w-full
                                rounded-[18px]
                                border border-[#D9D9D9] 
                                bg-white
                                px-4 pt-4 pb-3
                                text-left
                                shadow-[0_6px_18px_rgba(0,0,0,0.08)]
                                active:scale-[0.99]
                                transition
                            "
                        >

                            <div className="flex items-start justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    {route.isOptimal ? (
                                        <span className="rounded-[10px] border border-gray-300 px-3 py-1 text-[13px] text-gray-700">
                                            최적
                                        </span>
                                    ) : (
                                        <span className="rounded-[10px] border border-gray-300 px-3 py-1 text-[13px] text-gray-700">
                                            {ROUTE_TYPE_LABEL[route.routeType]}
                                        </span>
                                    )}

                                    {route.lines.map((l) => (
                                        <span
                                            key={l}
                                            className="rounded-[10px] border border-gray-300 px-3 py-1 text-[13px] text-gray-700"
                                        >
                                            {l}
                                        </span>
                                    ))}
                                </div>

                                <div className="shrink-0 flex items-center gap-1 text-[13px] text-gray-400">
                                    <span>상세보기</span>
                                    <span className="text-[18px] leading-none">›</span>
                                </div>
                            </div>

                            <div className="py-6 text-center">
                                <div className="text-[40px] font-bold text-makcha-navy-900 leading-none">
                                    {route.departureTime} 출발
                                </div>
                                <div className="mt-2 text-[16px] font-regular text-[#000000]">
                                    {route.timeUntilDeparture}
                                </div>
                            </div>

                            <div className="border-t border-gray-300/80 dark:border-makcha-navy-800 pt-3">
                                <div className="grid grid-cols-3 text-center text-[13px] text-gray-600">
                                    <span>총 {route.totalDurationMin}분 소요</span>
                                    <span>환승 {route.transferCount}회</span>
                                    <span>도보 {route.walkingTimeMin}분</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <img
                src={LogoCircle}
                alt="service logo"
                className="fixed bottom-6 right-5 h-[56px] w-[56px] rounded-full"
            />
        </section>
    );
};

export default RouteResultPanelMobile;