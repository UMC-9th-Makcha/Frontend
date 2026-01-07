import type { PastSummary } from "../mocks/historyMock";
import { ChevronRight } from "lucide-react";

type Props = {
    summary: PastSummary;
    onDetail?: () => void;
};

const PastSummaryCard = ({ summary, onDetail }: Props) => {
    const { thisMonthTaxiCost, savedCount } = summary;

    return (
        <div
            className="
                w-full rounded-[20px]
                border border-gray-200 bg-white
                pt-[15px] pl-6 pr-[25px] pb-[21px] shadow-sm
                dark:border-makcha-navy-700 dark:bg-makcha-navy-900
            "
        >
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-[26px] font-medium text-makcha-navy-900 dark:text-white">
                        이번 달 택시비로
                    </div>

                    <div
                        className={`
                            mt-[13px] text-[32px] font-medium
                            ${thisMonthTaxiCost === 0
                                ? "text-makcha-navy-900 dark:text-white"
                                : "text-makcha-navy-600 dark:text-makcha-navy-300"
                            }
            `}
                    >
                        {thisMonthTaxiCost.toLocaleString()}원
                    </div>

                    <div className="mt-[13px] text-[16px] text-gray-500 dark:text-white/60">
                        {savedCount === 0
                            ? "절약했어요! 막차 알림을 설정하고 택시비를 아껴보세요!"
                            : `절약하고, 총 ${savedCount}번의 막차를 사수했어요!`}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onDetail}
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
        </div>
    );
};

export default PastSummaryCard;
