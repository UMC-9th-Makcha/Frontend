import { DESTINATIONS } from "./../mocks/alarmMock";
import { Home } from "lucide-react";
import type { OriginSearchItem } from "../types/search";
import { HorizontalScroll } from "../../../components/common/HorizontalScroll";

type Props = {
    onSelectDestination: (item: OriginSearchItem) => void;
};

const DestinationCarousel = ({ onSelectDestination }: Props) => {
    return (
        <section className="mt-8 max-md:mt-7">
            <p className="text-sm font-semibold text-makcha-navy-900 dark:text-white max-md:text-[18px] max-md:font-medium max-md:text-[#262626]">
                도착지
            </p>

            <HorizontalScroll
                items={DESTINATIONS}
                className="mt-3"
                contentClassName="shrink-0"
                renderItem={(d) => (
                    <button
                        type="button"
                        className="
                            w-64 h-30
                            rounded-[20px]
                            border border-gray-200
                            bg-white p-4
                            shadow-sm text-left
                            dark:border-makcha-navy-700 dark:bg-makcha-navy-900
                            max-md:w-75 max-md:h-33
                            max-md:rounded-[18px]
                        "
                    >
                        <div className="flex items-center gap-2">
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
                )}
                onItemClick={(d, moved) => {
                    if (moved) return;

                    onSelectDestination({
                        id: String(d.id),
                        title: d.label,
                        address: d.address,
                    });
                }}
            />
        </section>
    );
};

export default DestinationCarousel;
