import { Search } from "lucide-react";
import type { OriginSearchItem } from "./types/search";
import RouteCard from "./components/RouteCard";
import type { AlarmRoute } from "./types/alarm";

type Props = {
    origin: OriginSearchItem;
    destination: OriginSearchItem;
    routes: AlarmRoute[];
    onSelectRoute: (route: AlarmRoute) => void;
};

const RouteResultPanel = ({ origin, destination, routes, onSelectRoute }: Props) => {
    return (
        <section
            className="
                relative h-full min-h-0
                w-full md:w-[402px] md:shrink-0
                bg-white dark:bg-makcha-navy-900
                md:border-r md:border-gray-200 dark:md:border-makcha-navy-800
            "
        >
            <div
                className="
                h-full min-h-0 flex flex-col
                px-[20px] pt-[62px]
                max-md:px-5 max-md:pt-6
                "
            >
                {/* 타이틀 */}
                <div className="flex items-center">
                    <h1 className="text-[32px] text-makcha-navy-900 dark:text-white">알림 선택</h1>
                </div>

                <p className="mt-[7px] text-[18px] text-gray-500 dark:text-white/60">
                    카카오톡으로 받으실 알림을 선택해 주세요!
                </p>

                {/* 출발/도착 */}
                <div className="mt-[24px] space-y-[14px] max-md:mt-5 max-md:space-y-3">
                    <button
                        type="button"
                        className="
                        flex h-[42px] w-full items-center gap-3
                        rounded-[20px]
                        border border-gray-200
                        bg-white
                        pl-[16px] pr-[15px]
                        shadow-sm
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
                        className="
                            flex h-[42px] w-full items-center gap-3
                            rounded-[20px]
                            border border-gray-200
                            bg-white
                            pl-[16px] pr-[15px]
                            shadow-sm
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

                {/* 경로 리스트 */}
                <div
                    className="
                    mt-[46px] flex-1 min-h-0
                    w-full min-w-0
                    space-y-[29px]
                    overflow-y-auto overflow-x-hidden
                    pb-10
                    max-md:mt-5 max-md:space-y-4
                "
                >
                    {routes.map((route) => (
                        <RouteCard key={route.id} route={route} onSelect={onSelectRoute} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RouteResultPanel;
