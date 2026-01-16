import { ChevronLeft, ChevronRight, Bell } from "lucide-react";
import type { AlarmRoute } from "../types/alarm";
import type { RouteConfirmDetail, RouteConfirmSegment } from "../types/routeConfirm";
import SegmentBar from "../components/SegmentBar";

type Props = {
    route: AlarmRoute;
    detail: RouteConfirmDetail;
    onBack: () => void;
    onConfirm: () => void;
};

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

                <div className="min-w-0 flex-1">
                    {segments.map((s, idx) => (
                        <div key={idx} className="relative pb-6">
                            <div className={`absolute -left-[37px] top-1 h-3 w-3 rounded-full ${dot(s)}`} />

                            {s.mode === "WALK" ? (
                                <>
                                    <p className="text-[16px] font-semibold text-gray-900 dark:text-white">도보</p>
                                    <p className="mt-1 text-[14px] text-gray-600 dark:text-white/60">
                                        {s.durationMin}분{typeof s.distanceM === "number" ? `  ${s.distanceM}m` : ""}
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
                                        {s.durationMin}분{typeof s.stops === "number" ? ` | ${s.stops}개 정거장` : ""}
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
    const chips: string[] = route.lines ?? [];

    return (
        <div className="flex min-h-full flex-col">
            <div className="px-4 pt-10">
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
                                        <span className="rounded-full border border-gray-200 bg-white px-2 py-1 text-[12px] font-semibold text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
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

                        <p className="mt-2 text-[14px] text-gray-500 dark:text-white/60">{detail.etaText}</p>

                        <SegmentBar segments={detail.segments} />
                    </div>
                </div>

                <Timeline segments={detail.segments} />
            </div>

            {/* 버튼 */}
            <div className="mt-auto px-[16px] pt-4 space-y-3 pb-[max(80px,env(safe-area-inset-bottom))] md:pb-[20px]">
                <button
                    type="button"
                    className="h-12 w-full rounded-[14px] bg-[#FFE89F] transition hover:bg-[#FFD966] flex items-center justify-center gap-2 text-[18px] font-semibold text-black shadow-sm"
                >
                    <Bell className="h-5 w-5" strokeWidth={2} />
                    문자 메시지로 알림 받기
                </button>

                <button
                    type="button"
                    onClick={onConfirm}
                    className="h-12 w-full rounded-[14px] border border-gray-200 bg-white text-[18px] font-semibold text-gray-900 transition hover:bg-gray-50 hover:border-gray-300 dark:border-white/60 dark:bg-makcha-navy-900 dark:text-white dark:hover:bg-white/5 dark:hover:border-white/20"
                >
                    확인
                </button>

                <button
                    type="button"
                    className="h-12 w-full rounded-[14px] bg-[#FF0000] text-white flex items-center justify-center gap-2 text-[18px] font-semibold hover:bg-red-600 shadow-sm"
                >
                    <Bell className="h-5 w-5" strokeWidth={2} />
                    알림 취소하기
                </button>
            </div>
        </div>
    );
}