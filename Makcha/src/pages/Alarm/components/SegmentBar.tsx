import type { RouteConfirmSegment } from "../types/routeConfirm";

type Props = {
    segments: RouteConfirmSegment[];
};

const bgClass = (s: RouteConfirmSegment) => {
    if (s.mode === "SUBWAY") return "bg-green-500";
    if (s.mode === "BUS") return "bg-blue-500";
    return "bg-gray-500 dark:bg-white/30";
};

const textClass = (s: RouteConfirmSegment) => {
    if (s.mode === "WALK") return "text-white/80";
    return "text-white";
};

export default function SegmentBar({ segments }: Props) {
    const total = segments.reduce((a, s) => a + s.durationMin, 0);

     // 너무 얇으면 안 보이니 최소폭 보정
    const widths = segments.map((s) => {
        const pct = total === 0 ? 0 : (s.durationMin / total) * 100;
        const minPct = s.durationMin <= 1 ? 6 : 0;
        return Math.max(pct, minPct);
    });

    // 100% 초과 방지: 합이 100 넘으면 비율로 다시 줄이기
    const sum = widths.reduce((a, v) => a + v, 0);
    const scale = sum > 100 ? 100 / sum : 1;
    const scaledWidths = widths.map((w) => w * scale);

    return (
        <div className="mt-3">
            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                <div className="flex h-full">
                    {segments.map((s, idx) => {
                        const width = scaledWidths[idx];
                        const showText = width >= 8;

                        return (
                            <div
                                key={idx}
                                className={[bgClass(s), "h-full", "flex items-center justify-center"].join(" ")}
                                style={{ width: `${width}%` }}
                                aria-label={`${s.mode} ${s.durationMin}분`}
                            >
                                {showText && (
                                    <span
                                        className={[
                                            textClass(s),
                                            "text-[11px] font-semibold leading-none select-none",
                                        ].join(" ")}
                                    >
                                        {s.durationMin}분
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
