import { useRef } from "react";
import { DESTINATIONS } from "../../mocks/alarmMock";
import { useScrollIndicator } from "../../hooks/useScrollIndicator";
import HomeIcon from "../../../../assets/icons/Home.svg";
import type { OriginSearchItem } from "../../mocks/originSearchMock";

type Props = {
    onSelectDestination: (item: OriginSearchItem) => void;
};

const DestinationCarousel = ({ onSelectDestination }: Props) => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const indicator = useScrollIndicator(scrollerRef);

    return (
        <section className="mt-8">
            <p className="text-sm font-semibold text-makcha-navy-900 dark:text-white">도착지</p>

            {/* 가로 스크롤 카드 */}
            <div
                ref={scrollerRef}
                className="mt-3 flex gap-4 overflow-x-auto pb-3 scroll-smooth hide-scrollbar"
                style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                }}
            >
                <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                `}</style>

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
                            shrink-0 w-[258px] h-[122px]
                            rounded-[20px] border border-gray-200 bg-white p-4
                            shadow-sm text-left
                            "
                    >
                        <div className="flex items-center gap-2">
                            {/* 아이콘 */}
                            <img
                                src={HomeIcon}
                                alt="홈"
                                className="h-[19px] w-[19px] opacity-70"
                            />
                            <span className="text-sm font-semibold text-makcha-navy-600">
                                {d.label}
                            </span>
                        </div>

                        <div className="mt-2 text-[28px] font-bold leading-none text-makcha-navy-900">
                            {d.time}
                        </div>

                        <div className="mt-2 text-xs text-gray-500">{d.address}</div>
                    </button>
                ))}

                <div className="shrink-0 w-4" />
            </div>

            {/* 스크롤 */}
            <div className="relative mt-2 h-[4px] w-full rounded-full bg-makcha-navy-200">
                <div
                    className="absolute top-0 h-[4px] rounded-full bg-makcha-navy-600 transition-[left,width] duration-75"
                    style={{ left: indicator.left, width: indicator.width }}
                />
            </div>
        </section>
    );
};

export default DestinationCarousel;
