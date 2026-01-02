import { useRef } from "react";
import { RECENT_DESTINATIONS } from "../../mocks/alarmMock";

const RecentDestinations = () => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    return (
        <section className="mt-7">
            <p className="text-[20px] font-medium text-[#262626] dark:text-white">
                최근 목적지
            </p>

            <div
                ref={scrollerRef}
                className="mt-3 flex gap-3 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
                style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
            >
                {RECENT_DESTINATIONS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className="
                            shrink-0
                            h-[48px] px-4
                            rounded-[18px]
                            border border-gray-200 dark:border-makcha-navy-700
                            bg-white dark:bg-makcha-navy-900
                            shadow-[0_0_5px_rgba(136,136,136,0.18)]
                            text-left
                            "
                    >
                        <span className="block max-w-[220px] truncate text-[13px] text-makcha-navy-900 dark:text-white">
                            {item.label}
                        </span>
                    </button>
                ))}

                <div className="shrink-0 w-2" />
            </div>
        </section>
    );
};

export default RecentDestinations;
