import SearchIcon from "../../../assets/icons/Search.svg";
import type { OriginSearchItem } from "../mocks/originSearchMock";
import type { AlarmRoute } from "../mocks/alarmMock";
import LogoCircle from "../../../assets/icons/Logo-circle.svg";

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

const RouteResultPanel = ({ origin, destination, routes, onSelectRoute }: Props) => {
    return (
        <section className="relative h-full min-h-0 w-[402px] shrink-0 border-r border-gray-200 bg-white dark:border-makcha-navy-800 dark:bg-makcha-navy-900">
            <div className="h-full px-[20px] pt-[62px] flex flex-col min-h-0">
                {/* 타이틀 */}
                <div className="flex items-center">
                    <h1 className="text-[32px] text-makcha-navy-900 dark:text-white">
                        알림 선택
                    </h1>
                </div>

                <p className="mt-[7px] text-[18px] text-gray-500 dark:text-white/60">
                    카카오톡으로 받으실 알림을 선택해 주세요!
                </p>

                <div className="mt-[24px] space-y-[14px]">
                    {/* 현위치 */}
                    <button
                        type="button"
                        className="flex h-[42px] w-full items-center gap-3 rounded-[20px] border border-gray-200 bg-white pl-[16px] pr-[15px] shadow-sm"
                    >
                        <span className="relative h-4 w-4">
                            <span className="absolute inset-0 rounded-full bg-makcha-navy-400 opacity-60 blur-[4px]" />
                            <span className="absolute inset-1 rounded-full bg-makcha-navy-600" />
                        </span>

                        <p className="flex-1 truncate text-left text-sm text-gray-600">
                            {origin ? `출발지 : ${origin.title}` : "출발지"}
                        </p>

                        <img src={SearchIcon} alt="검색" className="h-5 w-5 opacity-60" />
                    </button>

                    {/* 도착지 */}
                    <button
                        type="button"
                        className="flex h-[42px] w-full items-center gap-3 rounded-[20px] border border-gray-200 bg-white pl-[16px] pr-[15px] shadow-sm"
                    >
                        <span className="relative h-4 w-4">
                            <span className="absolute inset-0 rounded-full bg-makcha-navy-400 opacity-60 blur-[4px]" />
                            <span className="absolute inset-1 rounded-full bg-makcha-navy-600" />
                        </span>

                        <p className="flex-1 truncate text-left text-sm text-gray-600">
                            {destination ? `도착지 : ${destination.title}` : "도착지"}
                        </p>

                        <img src={SearchIcon} alt="검색" className="h-5 w-5 opacity-60" />
                    </button>
                </div>

                {/* 경로 리스트 */}
                <div className="mt-[46px] flex-1 min-h-0 space-y-[29px] overflow-y-auto pb-6 overflow-x-hidden">
                    {routes.map((route) => (
                        <button
                            key={route.id}
                            type="button"
                            onClick={() => onSelectRoute(route)}
                            className="
                                w-full h-[178px]
                                rounded-[20px]
                                border border-gray-200
                                bg-white
                                px-[14px] py-[15px]
                                text-left
                                shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                                hover:bg-gray-50
                                flex flex-col
                            "
                        >
                            {/* 상단 */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    {route.isOptimal && (
                                        <span className="rounded-full border px-3 py-1 text-[14px] text-gray-600">
                                            최적
                                        </span>
                                    )}

                                    {/* 최적이 아닐 때 교통수단 표시 */}
                                    {!route.isOptimal && (
                                        <span className="rounded-full border px-3 py-1 text-[13px] text-gray-600">
                                            {ROUTE_TYPE_LABEL[route.routeType]}
                                        </span>
                                    )}

                                    {route.lines.map((l) => (
                                        <span
                                            key={l}
                                            className="rounded-full border px-3 py-1 text-[13px] text-gray-600"
                                        >
                                            {l}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-1 text-[14px] text-gray-500">
                                    <span>상세보기</span>
                                    <span className="text-[18px] leading-none">›</span>
                                </div>
                            </div>

                            {/* 가운데 */}
                            <div className="flex flex-1 flex-col items-center justify-center text-center">
                                <div className="text-[30px] font-bold text-gray-900 leading-tight">
                                    {route.departureTime} 출발
                                </div>
                                <div className="mt-[4px] text-[16px] text-gray-900">
                                    {route.timeUntilDeparture}
                                </div>
                            </div>

                            {/* 하단 */}
                            <div className="border-t border-gray-200 pt-3">
                                <div className="flex items-center justify-center gap-8 text-[14px] text-gray-500">
                                    <span>총 {route.totalDurationMin}분 소요</span>
                                    <span>환승 {route.transferCount}회</span>
                                    <span>도보 {route.walkingTimeMin}분</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 로고 */}
            <img
                src={LogoCircle}
                alt="service logo"
                className="absolute bottom-[34px] right-[20px]
                    h-[58px] w-[58px] rounded-full"
            />
        </section>
    );
};

export default RouteResultPanel;
