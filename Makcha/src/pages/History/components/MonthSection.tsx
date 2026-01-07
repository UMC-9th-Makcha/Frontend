import EmptyHistoryCard from "./EmptyHistoryCard";
import type { HistoryItem } from "../types/history";
import { ChevronRight } from "lucide-react";

type Props = {
    monthLabel: string;
    items: HistoryItem[];
    onDetail?: (item: HistoryItem) => void;
};

const MonthSection = ({ monthLabel, items, onDetail }: Props) => {
    const totalCount = items.length;

    return (
        <div>
            <div className="flex items-end justify-between">
                <div className="text-[32px] font-medium text-makcha-navy-900 dark:text-white">
                    {monthLabel}
                </div>
                <div className="text-[20px] text-gray-500 dark:text-white/60">
                    총 {totalCount}건
                </div>
            </div>

            <div className="mt-7">
                {totalCount === 0 ? (
                    <EmptyHistoryCard />
                ) : (
                    <div className="flex flex-col gap-6">
                        {items.map((it) => (
                            <div
                                key={it.id}
                                className="
                                    w-full rounded-[20px]
                                    border border-gray-200 bg-white
                                    p-8 pt-[15px] pl-6 pr-[25px] pb-[21px]
                                    shadow-sm
                                    dark:border-makcha-navy-700 dark:bg-makcha-navy-900
                                "
                            >
                                <div className="flex items-start justify-between">
                                    <div className="text-[20px] text-gray-500 dark:text-white/60">
                                        {it.date}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => onDetail?.(it)}
                                        className="
                                            flex items-center gap-2 text-[16px]
                                            text-gray-600 hover:text-makcha-navy-900
                                            dark:text-white/60 dark:hover:text-white
                                        "
                                    >
                                        상세보기
                                        <ChevronRight className="h-5 w-5" strokeWidth={2} />
                                    </button>
                                </div>

                                <div className="mt-4 text-[32px] font-medium text-makcha-navy-900 dark:text-white">
                                    {it.from} → {it.to}
                                </div>

                                <div className="mt-1 text-[20px] text-gray-500 dark:text-white/60">
                                    {it.departAt}분 출발 - {it.arriveAt} 도착
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MonthSection;
