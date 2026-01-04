type ChartPoint = { month: string; value: number };

type Props = {
    yearLabel: string;
    data: ChartPoint[];
    highlightMonth?: string;
};

const SaveReportGraph = ({ yearLabel, data, highlightMonth }: Props) => {
    const max = Math.max(...data.map((d) => d.value), 1);

    return (
        <div className="mt-6 w-full rounded-[10px] border border-black bg-white px-6 py-4">
            {/* 연도 */}
            <div className="flex items-center justify-center gap-1 text-[15px] font-bold text-black">
                <span>&lt;</span>
                <span>{yearLabel}</span>
                <span>&gt;</span>
            </div>

            {/* 그래프 */}
            <div className="mt-6">
                {/* 값 + 막대그래프 */}
                <div className="flex items-end justify-between gap-6 px-2">
                    {data.map((d) => {
                        const barHeight = Math.max(6, Math.round((d.value / max) * 120));
                        const isHighlight = d.month === highlightMonth;

                        return (
                            <div key={d.month} className="flex w-full flex-col items-center">
                                {/* 값 */}
                                <div className="mb-2 text-[15px] font-bold text-black">
                                    {d.value.toLocaleString()}원
                                </div>

                                {/* 막대 */}
                                <div
                                    className={[
                                        "w-10.25",
                                        isHighlight ? "bg-[#FFB700]" : "bg-[#406BB6]",
                                    ].join(" ")}
                                    style={{ height: `${barHeight}px` }}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="mt-0 h-0.5 w-full bg-black" />

                {/* 월 */}
                <div className="mt-2 flex items-start justify-between gap-6 px-2">
                    {data.map((d) => (
                        <div
                            key={d.month}
                            className="w-full text-center text-[15px] font-bold text-black"
                        >
                            {d.month}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SaveReportGraph;
