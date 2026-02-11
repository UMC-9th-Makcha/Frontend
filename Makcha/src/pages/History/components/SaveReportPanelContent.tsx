import { X } from "lucide-react";
import LoadingLogo from "../../../assets/icons/logo.svg";
import EmptyHistoryCard from "./EmptyHistoryCard";
import type { HistoryItem } from "../types/history";
import SaveReportGraph from "./SaveReportGraph";

type ChartPoint = { month: string; value: number; highlight?: boolean };

type Props = {
    loading?: boolean;

    onClose: () => void;

    // header
    totalSavedAmount: number;
    rewardMessage: string;

    // body
    isEmpty: boolean;
    totalCount: number;

    yearLabel: string;
    chartData: ChartPoint[];

    items: HistoryItem[];
};

export default function SaveReportPanelContent({
    loading,
    onClose,
    totalSavedAmount,
    rewardMessage,
    isEmpty,
    totalCount,
    yearLabel,
    chartData,
    items,
}: Props) {
    if (loading) {
        return (
            <>
                {/* 헤더 */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-[32px] font-medium text-makcha-navy-900 dark:text-white">
                            세이브 리포트
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="닫기"
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/10"
                    >
                        <X className="h-6 w-6" strokeWidth={2} />
                    </button>
                </div>

                <div className="flex h-full w-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center translate-y-80 max-md:translate-y-80">
                        <img
                            src={LoadingLogo}
                            alt="로딩"
                            className="h-30 w-30 max-md:h-[140px] max-md:w-[140px]"
                        />
                        <p
                            className="
                                mt-6 text-center text-[20px] font-medium
                                text-makcha-navy-900 dark:text-white
                                max-md:text-[25px] max-md:font-bold
                        "
                        >
                            세이브 리포트를 불러오는 중...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    const highlightMonth = chartData.find((d) => d.highlight)?.month;

    return (
        <>
            {/* 헤더 */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-[32px] font-medium text-makcha-navy-900 dark:text-white">
                        세이브 리포트
                    </h2>

                    {isEmpty ? (
                        <>
                            <p className="mt-4 text-[32px] md:text-[20px] font-bold text-makcha-navy-900 dark:text-white">
                                총 0원을 아꼈어요!
                            </p>
                            <p className="mt-1 text-[24px] md:text-[16px] text-gray-500 dark:text-white/60">
                                {rewardMessage}
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="mt-4 text-[32px] md:text-[20px] font-bold text-makcha-navy-900 dark:text-white">
                                총 {totalSavedAmount.toLocaleString()}원을 아꼈어요!
                            </p>
                            <p className="mt-1 text-[24px] md:text-[16px] text-gray-500 dark:text-white/60">
                                {rewardMessage}
                            </p>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="닫기"
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/10"
                >
                    <X className="h-6 w-6" strokeWidth={2} />
                </button>
            </div>

            {/* 본문 */}
            {isEmpty ? (
                <>
                    <div className="mt-61 flex items-end justify-between">
                        <div className="text-[20px] font-medium text-makcha-navy-900 dark:text-white">
                            상세 내역
                        </div>
                        <div className="text-[20px] text-gray-500 dark:text-white/60">
                            총 0건
                        </div>
                    </div>

                    <div className="mt-3">
                        <EmptyHistoryCard />
                    </div>
                </>
            ) : (
                <>
                    {chartData.length > 0 && (
                        <SaveReportGraph
                            yearLabel={yearLabel}
                            data={chartData.map(({ month, value }) => ({ month, value }))}
                            highlightMonth={highlightMonth}
                        />
                    )}

                    <div className="mt-6 flex items-end justify-between">
                        <div className="text-[24px] md:text-[20px] font-medium text-makcha-navy-900 dark:text-white">
                            상세 내역 / 절약 비용
                        </div>
                        <div className="text-[24px] md:text-[20px] text-gray-500 dark:text-white/60">
                            총 {totalCount}건
                        </div>
                    </div>

                    <div className="mt-3 flex flex-col gap-4">
                        {items.map((it) => (
                            <div
                                key={it.id}
                                className="
                                    w-full rounded-[13px]
                                    border border-gray-200 bg-white
                                    px-6 py-5 shadow-sm
                                    dark:border-makcha-navy-700 dark:bg-makcha-navy-900
                                "
                            >
                                <div className="text-[16px] text-gray-500 dark:text-white/60">
                                    {it.date}
                                </div>

                                <div className="mt-2 text-[26px] font-bold text-makcha-navy-900 dark:text-white">
                                    {it.from} → {it.to}
                                </div>

                                <div className="text-[16px] text-gray-500 dark:text-white/60">
                                    {it.departAt}분 출발 - {it.arriveAt} 도착
                                </div>

                                {typeof it.savedAmount === "number" && (
                                    <div className="mt-3 text-[20px] font-medium text-makcha-navy-600 dark:text-makcha-navy-300">
                                        {it.savedAmount.toLocaleString()}원을 절약했어요!
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}