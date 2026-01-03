import EmptyHistoryCard from "./EmptyHistoryCard";
import type { HistoryItem } from "../mocks/historyMock";

type Props = {
    open: boolean;
    onClose: () => void;
    totalSavedAmount: number;
    items: HistoryItem[];
};

const SaveReportDrawer = ({ open, onClose, totalSavedAmount, items }: Props) => {
    if (!open) return null;

    const totalCount = items.length;
    const isEmpty = totalCount === 0;

    return (
        <>
            <button
                type="button"
                aria-label="close save report"
                onClick={onClose}
                className="fixed inset-0 z-60 bg-black/10 md:inset-y-0 md:right-0 md:left-62"
            />

            <aside
                className="
                    fixed top-0 left-0 z-70
                    h-dvh w-100.5
                    border-r border-[#E2E2E2]
                    bg-white
                    shadow-[8px_0_20px_rgba(0,0,0,0.08)]
                    md:left-62
        "
                role="dialog"
                aria-modal="true"
            >
                <div className="h-full overflow-y-auto px-5 pt-15.5 pb-10">
                    {/* 헤더 */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-[32px] font-medium text-black">세이브 리포트</h2>

                            {isEmpty ? (
                                <>
                                    <p className="mt-4.5 text-[20px] font-medium text-black">
                                        총 0원을 아꼈어요!
                                    </p>
                                    <p className="mt-1.25 text-[16px] text-[#5F5F5F]">
                                        알림을 설정해보세요!
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="mt-4.5 text-[20px] font-medium text-black">
                                        총 {totalSavedAmount.toLocaleString()}원을 아꼈어요!
                                    </p>
                                    <p className="mt-1.25 text-[16px] text-[#5F5F5F]">
                                        알림을 설정해보세요!
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* 본문 */}
                    {isEmpty ? (
                        <>
                            <div className="mt-[245px] flex items-end justify-between">
                                <div className="text-[20px] font-medium text-black">상세 내역</div>
                                <div className="text-[20px] text-[#5F5F5F]">총 0건</div>
                            </div>

                            <div className="mt-3">
                                <EmptyHistoryCard />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* 그래프 영역 */}
                            <div className="mt-6 w-full rounded-[10px] border border-black bg-white">
                                <div className="px-6 py-4 text-center text-[16px] text-[#5F5F5F]">
                                    그래프
                                </div>
                                <div className="h-40" />
                            </div>

                            <div className="mt-5.75 flex items-end justify-between">
                                <div className="text-[20px] font-medium text-black">
                                    상세 내역 / 절약 비용
                                </div>
                                <div className="text-[20px] text-[#5F5F5F]">
                                    총 {totalCount}건
                                </div>
                            </div>

                            <div className="mt-3 flex flex-col gap-4">
                                {items.map((it) => (
                                    <div
                                        key={it.id}
                                        className="px-4 pt-3 pb-3 w-full rounded-[13px] border border-gray-200 bg-white px-6 py-5 shadow-sm"
                                    >
                                        <div className="text-[16px] text-[#5F5F5F]">{it.date}</div>

                                        <div className="mt-2.25 text-[26px] font-bold text-black">
                                            {it.from} → {it.to}
                                        </div>

                                        <div className="mt-2 text-[16px] text-[#5F5F5F]">
                                            {it.departAt}분 출발 - {it.arriveAt} 도착
                                        </div>

                                        {typeof it.savedAmount === "number" && (
                                            <div className="mt-2 text-[20px] font-medium text-makcha-navy-600">
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

export default SaveReportDrawer;
