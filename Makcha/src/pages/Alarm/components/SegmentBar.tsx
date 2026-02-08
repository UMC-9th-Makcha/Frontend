import { PATH_COLORS } from "../../../components/common/Map/constant";
import type { RouteConfirmSegment } from "../types/routeConfirm";

type Props = {
    segments: RouteConfirmSegment[];
};

const labelText = (min: number) => `${Math.max(1, Math.ceil(min))}분`;

const getSegColor = (s: RouteConfirmSegment) => {
    const t = s.mapType ?? (s.mode === "WALK" ? "WALK" : "UNKNOWN");
    return PATH_COLORS[t]?.light ?? "#9CA3AF";
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
        const minPct = s.durationMin <= 1 ? 10 : 0;
        return Math.max(pct, minPct);
    });

    // 100% 초과 방지
    const sum = widths.reduce((a, v) => a + v, 0);
    const scale = sum > 100 ? 100 / sum : 1;
    const scaledWidths = widths.map((w) => w * scale);

    return (
        <div className="mt-3">
            <div className="relative">
                {/* bar */}
                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                    <div className="flex h-full">
                        {segments.map((s, idx) => (
                            <div
                                key={idx}
                                className="h-full"
                                style={{
                                    width: `${scaledWidths[idx]}%`,
                                    backgroundColor: getSegColor(s),
                                }}
                                aria-label={`${s.mode} ${labelText(s.durationMin)}`}
                            />
                        ))}
                    </div>
                </div>

                {/* labels */}
                <div className="pointer-events-none absolute inset-0 flex">
                    {segments.map((s, idx) => (
                        <div
                            key={idx}
                            style={{ width: `${scaledWidths[idx]}%` }}
                            className="flex h-4 items-center justify-center"
                        >
                            <span
                                className={[
                                    textClass(s),
                                    "text-[11px] font-semibold leading-none select-none whitespace-nowrap",
                                ].join(" ")}
                            >
                                {labelText(s.durationMin)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
