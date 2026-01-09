import { ChevronLeft, ChevronRight, Bell } from "lucide-react";
import type { AlarmRoute } from "./types/alarm";
import type { RouteConfirmDetail, RouteConfirmSegment } from "./types/routeConfirm";

type Props = {
    route: AlarmRoute;
    detail: RouteConfirmDetail;
    onBack: () => void;
    onConfirm: () => void;
};

function SegmentBar({ segments }: { segments: RouteConfirmSegment[] }) {
    const total = segments.reduce((a, s) => a + s.durationMin, 0);

    const bgClass = (s: RouteConfirmSegment) => {
        if (s.mode === "SUBWAY") return "bg-green-500";
        if (s.mode === "BUS") return "bg-blue-500";
        return "bg-gray-500 dark:bg-white/30"; // WALK/기타
    };

    const textClass = (s: RouteConfirmSegment) => {
        if (s.mode === "WALK") return "text-white/80";
        return "text-white";
    };

    return (
        <div className="mt-3">
            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                <div className="flex h-full">
                    {segments.map((s, idx) => {
                        const pct = total === 0 ? 0 : (s.durationMin / total) * 100;

                        // 너무 얇으면 안 보이니 최소폭 보정
                        const minPct = s.durationMin <= 1 ? 6 : 0;
                        const width = Math.max(pct, minPct);
                        const showText = width >= 8;

                        return (
                            <div
                                key={idx}
                                className={[
                                    bgClass(s),
                                    "h-full",
                                    "flex items-center justify-center",
                                ].join(" ")}
                                style={{ width: `${width}%` }}
                                aria-label={`${s.mode} ${s.durationMin}분`}
                            >
                                {showText && (
                                    <span
                                        className={[
                                            textClass(s),
                                            "text-[11px] font-semibold leading-none",
                                            "select-none",
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

function Timeline({ segments }: { segments: RouteConfirmSegment[] }) {
    const dot = (s: RouteConfirmSegment) => {
        if (s.mode === "SUBWAY") return "bg-green-500";
        if (s.mode === "BUS") return "bg-blue-500";
        return "bg-gray-400 dark:bg-white/30";
    };

    return (
        <div className="mt-6">
            <div className="flex gap-4">
                <div className="relative w-6">
                    <div className="absolute left-2 top-0 bottom-0 border-l-2 border-dashed border-gray-300 dark:border-white/20" />
                </div>

                {/* 내용 */}
                <div className="min-w-0 flex-1">
                    {segments.map((s, idx) => (
                        <div key={idx} className="relative pb-6">
                            <div
                                className={`absolute -left-[37px] top-1 h-3 w-3 rounded-full ${dot(s)}`}
                            />

                            {s.mode === "WALK" ? (
                                <>
                                    <p className="text-[16px] font-semibold text-gray-900 dark:text-white">
                                        도보
                                    </p>
                                    <p className="mt-1 text-[14px] text-gray-600 dark:text-white/60">
                                        {s.durationMin}분
                                        {typeof s.distanceM === "number" ? `  ${s.distanceM}m` : ""}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-[18px] font-semibold text-gray-900 dark:text-white">
                                        <span className="mr-2 rounded-md bg-gray-100 px-2 py-1 text-[12px] font-bold text-gray-800 dark:bg-white/10 dark:text-white/80">
                                            {s.lineLabel}
                                        </span>
                                        {s.from} → {s.to}
                                    </p>

                                    <p className="mt-1 text-[14px] text-gray-600 dark:text-white/60">
                                        {s.durationMin}분
                                        {typeof s.stops === "number" ? ` | ${s.stops}개 정거장` : ""}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function RouteConfirmPanel({ route, detail, onBack, onConfirm }: Props) {
    const chips = route.lines;

    const panel = (
        <section className="flex h-full flex-col bg-white dark:bg-makcha-navy-900">
            <div className="shrink-0 px-5 pt-6 md:pt-[62px]">
                <div className="flex items-start gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-white/80 dark:hover:bg-white/10"
                        aria-label="뒤로가기"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-[32px] font-bold leading-none text-gray-900 dark:text-white">
                                {route.totalDurationMin}분
                            </h1>

                            <div className="flex flex-wrap items-center gap-1">
                                {chips.map((c, idx) => (
                                    <div key={`${c}-${idx}`} className="flex items-center gap-1">
                                        <span
                                            className="
                                                rounded-full
                                                border border-gray-200
                                                bg-white
                                                px-2 py-1
                                                text-[12px] font-semibold
                                                text-gray-800
                                                dark:border-white/10 dark:bg-white/5 dark:text-white/80
                                            "
                                        >
                                            {c}
                                        </span>

                                        {idx < chips.length - 1 && (
                                            <ChevronRight
                                                className="h-4 w-4 translate-y-[1px] text-gray-400 dark:text-white/40"
                                                strokeWidth={2}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="mt-2 text-[14px] text-gray-500 dark:text-white/60">
                            {detail.etaText}
                        </p>

                        <SegmentBar segments={detail.segments} />
                    </div>
                </div>
            </div>

            {/* 본문 */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6">
                <Timeline segments={detail.segments} />
            </div>

            {/* 버튼 */}
            <div className="shrink-0 px-5 pb-5 space-y-3">
                <button className="h-12 w-full rounded-[14px] bg-[#FFE89F] transition hover:bg-[#FFD966] flex items-center justify-center gap-2 text-[18px] font-semibold text-black shadow-sm">
                    <Bell className="h-5 w-5" strokeWidth={2} />
                    문자 메시지로 알림 받기
                </button>

                <button
                    type="button"
                    onClick={onConfirm}
                    className="
                        h-12 w-full rounded-[14px]
                        border border-gray-200
                        bg-white text-[18px] font-semibold text-gray-900 transition
                        hover:bg-gray-50 hover:border-gray-300
                        dark:border-white/60 dark:bg-makcha-navy-900 dark:text-white dark:hover:bg-white/5 dark:hover:border-white/20"
                    >
                    확인
                </button>

                <button
                    type="button"
                    className="
                        h-12 w-full rounded-[14px]
                        bg-[#FF0000] text-white
                        flex items-center justify-center gap-2
                        text-[18px] font-semibold
                        hover:bg-red-600 shadow-sm
                    "
                >
                    <Bell className="h-5 w-5" strokeWidth={2} />
                    알림 취소하기
                </button>
            </div>
        </section>
    );

    return (
        <div className="h-dvh w-full overflow-hidden">
            {/* Mobile */}
            <div className="h-full md:hidden">{panel}</div>

            {/* PC */}
            <div className="hidden h-full md:flex">
                <div className="h-full w-[402px] shrink-0 border-r border-gray-200 dark:border-makcha-navy-800">
                    {panel}
                </div>
            </div>
        </div>
    );
}