import { useRef } from "react";
import { RECENT_DESTINATIONS } from "./../mocks/alarmMock";
import type { OriginSearchItem } from "./../mocks/originSearchMock";

type Props = {
    onSelectDestination: (item: OriginSearchItem) => void;
};

const RecentDestinations = ({ onSelectDestination }: Props) => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    return (
        <section className="mt-8 max-md:mt-7">
            <p className="text-sm font-semibold text-makcha-navy-900 dark:text-white max-md:text-[20px] max-md:font-medium max-md:text-[#262626]">
                최근 목적지
            </p>

            {/* 가로 스크롤 */}
            <div
                ref={scrollerRef}
                className="mt-3 flex gap-4 overflow-x-auto pb-3 scroll-smooth no-scrollbar max-md:gap-3 max-md:pb-2"
                style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
            >
                {RECENT_DESTINATIONS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                            onSelectDestination({
                                id: String(item.id),
                                title: item.label,
                                address: item.label,
                            })
                        }
                        className="
                            shrink-0
                            w-[142px] h-[42px]
                            rounded-[20px]
                            border border-gray-200
                            bg-white
                            px-4
                            text-left
                            shadow-[0_0_5px_rgba(136,136,136,0.25)]
                            dark:border-makcha-navy-700 dark:bg-makcha-navy-900
                            max-md:w-auto max-md:h-[48px]
                            max-md:rounded-[18px]
                            max-md:shadow-[0_0_5px_rgba(136,136,136,0.18)]
                        "
                    >
                        <span className="block truncate text-sm text-makcha-navy-900 dark:text-white max-md:max-w-[220px] max-md:text-[13px]">
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