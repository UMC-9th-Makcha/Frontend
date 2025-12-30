import { useRef } from "react";
import { RECENT_DESTINATIONS } from "../mocks/alarmMock";

const RecentDestinationsCarousel = () => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    return (
        <section className="mt-8">
            <p className="text-sm font-semibold text-makcha-navy-900 dark:text-white">최근 목적지</p>

            {/* 가로 스크롤 */}
            <div
                ref={scrollerRef}
                className="mt-3 flex gap-4 overflow-x-auto pb-3 scroll-smooth no-scrollbar"
                style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
            >
                {RECENT_DESTINATIONS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className="
                            shrink-0
                            w-[142px] h-[42px]
                            rounded-[20px]
                            border border-gray-200 bg-white
                            shadow-[0_0_5px_rgba(136,136,136,0.25)]
                            px-4
                            text-left
                            "
                    >
                        <span className="block truncate text-sm text-makcha-navy-900">
                            {item.label}
                        </span>
                    </button>
                ))}

                <div className="shrink-0 w-2" />
            </div>
        </section>
    );
};

export default RecentDestinationsCarousel;