import type { PastSummary } from "../mocks/historyMock";
import ArrowIcon from "../../../assets/icons/arrow.svg";

type Props = {
    summary: PastSummary;
    onDetail?: () => void;
};

const PastSummaryCard = ({ summary, onDetail }: Props) => {
    const { thisMonthTaxiCost, savedCount } = summary;

    return (
        <div className="w-full rounded-[20px] border border-gray-200 bg-white pt-3.75 pl-6 pr-6.25 pb-5.25 shadow-sm">

            <div className="flex items-start justify-between">
                <div>
                    <div className="text-[26px] font-medium text-black">이번 달 택시비로</div>
                    <div
                        className={`mt-[13px] text-[32px] font-medium ${thisMonthTaxiCost === 0 ? "text-black" : "text-[#4674C6]"
                            }`}
                    >
                        {thisMonthTaxiCost.toLocaleString()}원
                    </div>

                    <div className="mt-[13px] text-[16px] text-[#5F5F5F]">
                        {savedCount === 0
                            ? "절약했어요! 막차 알림을 설정하고 택시비를 아껴보세요!"
                            : `절약하고, 총 ${savedCount}번의 막차를 사수했어요!`}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onDetail}
                    className="flex items-center gap-2 text-[16px] text-[#454545] hover:text-black"
                >
                    상세보기
                    <img
                        src={ArrowIcon}
                        alt=""
                        className="h-4 w-4"
                    />
                </button>

            </div>
        </div>
    );
};

export default PastSummaryCard;
