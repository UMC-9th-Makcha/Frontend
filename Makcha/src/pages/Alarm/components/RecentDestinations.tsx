import { RECENT_DESTINATIONS } from "./../mocks/alarmMock";
import type { OriginSearchItem } from "../types/search";
import { HorizontalScroll } from "../../../components/common/HorizontalScroll";

type Props = {
    onSelectDestination: (item: OriginSearchItem) => void;
};

const RecentDestinations = ({ onSelectDestination }: Props) => {
    return (
        <section className="mt-8 max-md:mt-7">
            <p className="text-sm font-semibold text-makcha-navy-900 dark:text-white max-md:text-[18px] max-md:font-medium max-md:text-[#262626]">
                최근 목적지
            </p>

            <HorizontalScroll
                items={RECENT_DESTINATIONS}
                className="mt-3 max-md:mt-3"
                contentClassName="shrink-0"
                renderItem={(item) => (
                    <button
                        type="button"
                        className="
                            w-28 h-10
                            rounded-[20px]
                            border border-gray-200
                            bg-white
                            px-4
                            text-left
                            shadow-[0_0_5px_rgba(136,136,136,0.25)]
                            dark:border-makcha-navy-700 dark:bg-makcha-navy-900
                            max-md:w-auto max-md:h-10
                            max-md:rounded-[18px]
                            max-md:shadow-[0_0_5px_rgba(136,136,136,0.18)]
                        "
                    >
                        <span className="block truncate text-sm text-makcha-navy-900 dark:text-white max-md:max-w-[220px] max-md:text-[14px]">
                            {item.label}
                        </span>
                    </button>
                )}
                onItemClick={(item, moved) => {
                    if (moved) return;

                    onSelectDestination({
                        id: String(item.id),
                        title: item.label,
                        address: item.label,
                    });
                }}
            />
        </section>
    );
};

export default RecentDestinations;
