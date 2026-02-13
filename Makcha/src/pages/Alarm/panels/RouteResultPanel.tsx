import { Search, AlertTriangle } from "lucide-react";
import type { OriginSearchItem } from "../types/search";
import RouteCard from "../components/RouteCard";
import type { AlarmRoute } from "../types/alarm";

type Props = {
    origin: OriginSearchItem;
    destination: OriginSearchItem;
    routes: AlarmRoute[];
    onSelectRoute: (route: AlarmRoute) => void;
    onOpenOrigin?: () => void;
    onOpenDestination?: () => void;
};

const RouteResultPanel = ({
    origin,
    destination,
    routes,
    onSelectRoute,
    onOpenOrigin,
    onOpenDestination,
}: Props) => {
    const hasRoutes = (routes ?? []).length > 0;

    return (
        <div className="pt-7 md:pt-2">
            <div className="flex items-center">
                <h1 className="text-[32px] text-makcha-navy-900 dark:text-white">알림 선택</h1>
            </div>

            <p className="mt-2 text-[18px] text-gray-500 dark:text-white/60">
                문자 메시지로 받으실 알림을 선택해 주세요!
            </p>

            <div className="mt-6 space-y-[14px] max-md:mt-5 max-md:space-y-3">
                <button
                    type="button"
                    onClick={onOpenOrigin}
                    className="
                        flex h-[42px] w-full items-center gap-3
                        rounded-[20px] border border-gray-200 bg-white
                        pl-4 pr-4 shadow-sm
                        dark:border-makcha-navy-800 dark:bg-makcha-navy-900
                    "
                >
                    <span className="relative h-4 w-4">
                        <span className="absolute inset-0 rounded-full bg-makcha-navy-400 opacity-60 blur-[4px]" />
                        <span className="absolute inset-1 rounded-full bg-makcha-navy-600" />
                    </span>

                    <p className="flex-1 truncate text-left text-sm text-gray-600 dark:text-white/80">
                        {`출발지 : ${origin.title}`}
                    </p>

                    <Search className="h-6 w-6 text-[#5F5F5F] dark:text-white/60" strokeWidth={2} />
                </button>

                <button
                    type="button"
                    onClick={onOpenDestination}
                    className="
                        flex h-[42px] w-full items-center gap-3
                        rounded-[20px] border border-gray-200 bg-white
                        pl-4 pr-4 shadow-sm
                        dark:border-makcha-navy-800 dark:bg-makcha-navy-900
                    "
                >
                    <span className="relative h-4 w-4">
                        <span className="absolute inset-0 rounded-full bg-makcha-navy-400 opacity-60 blur-[4px]" />
                        <span className="absolute inset-1 rounded-full bg-makcha-navy-600" />
                    </span>

                    <p className="flex-1 truncate text-left text-sm text-gray-600 dark:text-white/80">
                        {`도착지 : ${destination.title}`}
                    </p>

                    <Search className="h-6 w-6 text-[#5F5F5F] dark:text-white/60" strokeWidth={2} />
                </button>
            </div>

            {/* 결과 영역 */}
            <div className="mt-10 w-full min-w-0 max-md:mt-5">
                {hasRoutes ? (
                    <div className="space-y-6 max-md:space-y-4">
                        {routes.map((route) => (
                            <RouteCard key={route.id} route={route} onSelect={onSelectRoute} />
                        ))}
                    </div>
                ) : (
                    // Empty
                    <div
                        className="
                        mt-5 rounded-[20px] border border-gray-200 bg-white p-6 text-center shadow-sm
                        dark:border-makcha-navy-800 dark:bg-makcha-navy-900
                    "
                    >
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10">
                            <AlertTriangle className="h-6 w-6 text-gray-500 dark:text-white/70" />
                        </div>

                        <h2 className="mt-5 text-[20px] font-semibold text-makcha-navy-900 dark:text-white">
                            막차 시간이 지났어요
                        </h2>

                        <p className="mt-2 text-[14px] leading-relaxed text-gray-500 dark:text-white/60">
                            현재 경로로는 막차 알림을 만들 수 없어요.
                            <br />
                            대기장소를 찾아주세요
                        </p>

                        <div className="mt-3 flex flex-col gap-2">
                            {onOpenDestination && (
                                <button
                                    type="button"
                                    onClick={onOpenDestination}
                                    className="
                    h-11 w-full rounded-[14px]
                    bg-makcha-navy-400 text-white font-semibold
                    hover:bg-makcha-navy-500 transition
                  "
                                >
                                    도착지 다시 선택
                                </button>
                            )}

                            {onOpenOrigin && (
                                <button
                                    type="button"
                                    onClick={onOpenOrigin}
                                    className="
                    h-11 w-full rounded-[14px]
                    border border-gray-200 bg-white text-gray-700 font-semibold
                    hover:bg-gray-50 transition
                    dark:border-makcha-navy-700 dark:bg-makcha-navy-900 dark:text-white/80 dark:hover:bg-white/5
                  "
                                >
                                    출발지 변경
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RouteResultPanel;