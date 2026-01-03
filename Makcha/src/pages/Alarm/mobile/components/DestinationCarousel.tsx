import { useRef } from "react";
import { DESTINATIONS } from "../../mocks/alarmMock";
import { useScrollIndicator } from "../../hooks/useScrollIndicator";
import HomeIcon from "../../../../assets/icons/Home.svg";

const DestinationCarousel = () => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const indicator = useScrollIndicator(scrollerRef);

    return (
        <section className="mt-7">
            <p className="text-[20px] font-medium text-[#262626] dark:text-white">
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
                        className="
                            shrink-0
                            w-[300px] h-[132px]
                            rounded-[18px]
                            border border-gray-200 dark:border-makcha-navy-700
                            bg-white p-4 shadow-sm text-left
                            "
                    >
                        <div className="flex items-center gap-2">
                            <img src={HomeIcon} alt="홈" className="h-[18px] w-[18px] opacity-70" />
                            <span className="text-[13px] font-semibold text-makcha-navy-600">
                                {d.label}
                            </span>
                        </div>

                        <div className="mt-2 text-[28px] font-bold leading-none text-makcha-navy-900">
                            {d.time}
                        </div>

                        <div className="mt-2 truncate text-[12px] text-gray-500">
                            {d.address}
                        </div>
                    </button>
                ))}

                <div className="shrink-0 w-4" />
            </div>

            <div className="relative mt-1 h-[3px] w-full rounded-full bg-makcha-navy-200 dark:bg-makcha-navy-700">
                <div
                    className="absolute top-0 h-[3px] rounded-full bg-[#4574C6] transition-[left,width] duration-75"
                    style={{ left: indicator.left, width: indicator.width }}
                />
            </div>
        </section>
    );
};

export default DestinationCarousel;
