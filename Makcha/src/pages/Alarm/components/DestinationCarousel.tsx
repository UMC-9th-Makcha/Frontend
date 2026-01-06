import { useRef } from "react";
import { DESTINATIONS } from "./../mocks/alarmMock";
import { useScrollIndicator } from "./../hooks/useScrollIndicator";
import { Home } from "lucide-react";
import type { OriginSearchItem } from "../types/search";

type Props = {
    onSelectDestination: (item: OriginSearchItem) => void;
};

const DestinationCarousel = ({ onSelectDestination }: Props) => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const indicator = useScrollIndicator(scrollerRef);

    return (
        <section className="mt-8 max-md:mt-7">
            <p className="text-sm font-semibold text-makcha-navy-900 dark:text-white max-md:text-[20px] max-md:font-medium max-md:text-[#262626]">
                도착지
            </p>

            {/* 가로 스크롤 카드 */}
            <div
                ref={scrollerRef}
                className="mt-3 flex gap-4 overflow-x-auto pb-3 scroll-smooth hide-scrollbar"
                style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                }}
            >
                <style>{`.hide-scrollbar::-webkit-scrollbar{display:none;}`}</style>

                {DESTINATIONS.map((d) => (
                    <button
                        key={d.id}
                        type="button"
                        onClick={() =>
                            onSelectDestination({
                                id: String(d.id),
                                title: d.label,
                                address: d.address,
                            })
                        }
                        className="
                            shrink-0
                            w-[258px] h-[122px]
                            rounded-[20px]
                            border border-gray-200
                            bg-white p-4
                            shadow-sm text-left
                            dark:border-makcha-navy-700 dark:bg-makcha-navy-900
                            max-md:w-[300px] max-md:h-[132px]
                            max-md:rounded-[18px]
                        "
                    >
                        <div className="flex items-center gap-2">
                            {/* 아이콘 */}
                            <Home className="h-5 w-5 text-makcha-navy-600" strokeWidth={1.5} />
                            <span className="text-sm font-semibold text-makcha-navy-600 max-md:text-[13px]">
                                {d.label}
                            </span>
                        </div>

                        <div className="mt-2 text-[28px] font-bold leading-none text-makcha-navy-900 dark:text-white">
                            {d.time}
                        </div>

                        <div className="mt-2 text-xs text-gray-500 max-md:truncate max-md:text-[12px]">
                            {d.address}
                        </div>
                    </button>
                ))}

                <div className="shrink-0 w-4" />
            </div>

            <div className="relative mt-2 h-[4px] w-full rounded-full bg-makcha-navy-200 dark:bg-makcha-navy-700 max-md:mt-1 max-md:h-[3px]">
                <div
                    className="
                        absolute top-0 h-[4px] rounded-full
                        bg-makcha-navy-600
                        transition-[left,width] duration-75
                        max-md:h-[3px]
                        max-md:bg-[#4574C6]
                    "
                    style={{ left: indicator.left, width: indicator.width }}
                />
            </div>
        </section>
    );
};

export default DestinationCarousel;
