import { X } from "lucide-react";
import EmptyHistoryCard from "./EmptyHistoryCard";
import type { HistoryItem } from "../types/history";
import SaveReportGraph from "./SaveReportGraph";

type Props = {
    open: boolean;
    onClose: () => void;
    totalSavedAmount: number;
    items: HistoryItem[];
};

const SaveReportPanel = ({ open, onClose, totalSavedAmount, items }: Props) => {
    if (!open) return null;

    const totalCount = items.length;
    const isEmpty = totalCount === 0;

    const chartData = [
        { year: 2025, month: "11월", value: 39700 },
        { year: 2025, month: "12월", value: 86400 },
        { year: 2026, month: "1월", value: 53400 },
    ];

    const yearLabel = `${chartData[0]?.year ?? new Date().getFullYear()}년`;
    const highlightMonth = chartData[1]?.month;

    return (
        <>
            <button
                type="button"
                aria-label="close save report"
                onClick={onClose}
                className="fixed inset-0 z-60 bg-black/10 dark:bg-black/30 md:inset-y-0 md:right-0 md:left-62"
            />

            <aside
                className="
                fixed inset-0 z-70
                h-dvh w-full
                bg-white
                shadow-[8px_0_20px_rgba(0,0,0,0.08)]
                dark:bg-makcha-navy-900
                md:inset-y-0 md:left-62 md:right-auto md:w-[402px]
                md:border-r md:border-[#E2E2E2] md:dark:border-makcha-navy-800
            "
            >
                <div className="h-full overflow-y-auto px-5 pt-[24px] pb-10 md:pt-[62px]">
                    {/* 헤더 */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-[32px] font-medium text-makcha-navy-900 dark:text-white">
                                세이브 리포트
                            </h2>

                            {isEmpty ? (
                                <>
                                    <p className="mt-[18px] text-[20px] font-bold text-makcha-navy-900 dark:text-white">
                                        총 0원을 아꼈어요!
                                    </p>
                                    <p className="mt-[5px] text-[16px] text-gray-500 dark:text-white/60">
                                        알림을 설정해보세요!
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="mt-[18px] text-[20px] font-bold text-makcha-navy-900 dark:text-white">
                                        총 {totalSavedAmount.toLocaleString()}원을 아꼈어요!
                                    </p>
                                    <p className="mt-[5px] text-[16px] text-gray-500 dark:text-white/60">
                                        알림을 설정해보세요!
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
                            <div className="mt-[245px] flex items-end justify-between">
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
                            <SaveReportGraph
                                yearLabel={yearLabel}
                                data={chartData.map(({ month, value }) => ({ month, value }))}
                                highlightMonth={highlightMonth}
                            />

                            <div className="mt-[23px] flex items-end justify-between">
                                <div className="text-[20px] font-medium text-makcha-navy-900 dark:text-white">
                                    상세 내역 / 절약 비용
                                </div>
                                <div className="text-[20px] text-gray-500 dark:text-white/60">
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

                                        <div className="mt-[9px] text-[26px] font-bold text-makcha-navy-900 dark:text-white">
                                            {it.from} → {it.to}
                                        </div>

                                        <div className="mt-2 text-[16px] text-gray-500 dark:text-white/60">
                                            {it.departAt}분 출발 - {it.arriveAt} 도착
                                        </div>

                                        {typeof it.savedAmount === "number" && (
                                            <div className="mt-2 text-[20px] font-medium text-makcha-navy-600 dark:text-makcha-navy-300">
                                                {it.savedAmount.toLocaleString()}원을 절약했어요!
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
};

export default SaveReportPanel;
