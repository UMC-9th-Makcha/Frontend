// src/pages/Alarm/panels/RouteConfirmPanel.tsx
import { ChevronLeft, ChevronRight, Bell } from "lucide-react";
import type { AlarmRoute } from "../types/alarm";
import type { RouteConfirmDetail } from "../types/routeConfirm";
import SegmentBar from "../components/SegmentBar";
import { RouteTimeline } from "../components/RouteTimeline";
import {
    buildChipGroupsFromSteps,
    normalizeRouteLineFallback,
    type RouteStep,
} from "../utils/routeChips";

type Props = {
    route: AlarmRoute;
    detail: RouteConfirmDetail;
    onBack: () => void;
    onConfirm: () => void;
    mode?: "alarm" | "history" | "historyPast";
    onClickSms?: () => void;
    onDeleteAlert?: () => void;
    deleting?: boolean;
};

export default function RouteConfirmPanel({
    route,
    detail,
    onBack,
    onConfirm,
    mode = "alarm",
    onClickSms,
    onDeleteAlert,
    deleting = false,
}: Props) {
    type DetailMaybeNestedSteps = RouteConfirmDetail & { steps?: RouteStep[]; detail?: { steps?: RouteStep[] } };
    const d = detail as unknown as DetailMaybeNestedSteps;

    const steps: RouteStep[] = d.steps ?? d.detail?.steps ?? [];
    const chipGroups = buildChipGroupsFromSteps(steps);

    const fallbackLines = Array.from(
        new Set(
            (route.lines ?? [])
                .map(normalizeRouteLineFallback)
                .filter((v) => v.length > 0)
        )
    );

    const showTransferChevron = (route.transferCount ?? 0) > 0;

    const isHistory = mode === "history";
    const isHistoryPast = mode === "historyPast";

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

                            <div className="flex flex-wrap items-center gap-1 mt-1">
                                {chipGroups.length > 0 ? (
                                    chipGroups.map((g, idx) => (
                                        <div key={idx} className="flex items-center gap-1">
                                            {g.labels.map((label, j) => (
                                                <span
                                                    key={`${label}-${j}`}
                                                    className="rounded-full border border-gray-200 bg-white px-2 py-1 text-[12px] font-semibold text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                                                >
                                                    {label}
                                                </span>
                                            ))}

                                            {idx < chipGroups.length - 1 && (
                                                <ChevronRight
                                                    className="h-4 w-4 translate-y-[1px] text-gray-400 dark:text-white/40"
                                                    strokeWidth={2}
                                                />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-wrap items-center gap-1">
                                        {fallbackLines.map((label, idx) => (
                                            <div key={`${label}-${idx}`} className="flex items-center gap-1">
                                                <span className="rounded-full border border-gray-200 bg-white px-2 py-1 text-[12px] font-semibold text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                                                    {label}
                                                </span>

                                                {showTransferChevron && idx < fallbackLines.length - 1 && (
                                                    <ChevronRight
                                                        className="h-4 w-4 translate-y-[1px] text-gray-400 dark:text-white/40"
                                                        strokeWidth={2}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="mt-2 text-[14px] text-gray-500 dark:text-white/60">{detail.etaText}</p>

                        <div className="-ml-12">
                            <SegmentBar segments={(detail as unknown as { segments: unknown }).segments as never} />
                        </div>

                        <div className="-ml-9">
                            <RouteTimeline segments={(detail as unknown as { segments: unknown }).segments as never} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto px-[16px] pt-4 space-y-3 pb-[max(80px,env(safe-area-inset-bottom))] md:pb-[20px]">
                {isHistory ? (
                    <>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="h-12 w-full rounded-[14px]
                                bg-white text-black
                                border border-[#909090]
                                transition-all duration-200
                                flex items-center justify-center
                                text-[18px] font-semibold
                                shadow-sm
                                hover:bg-[#f5f5f5]
                                hover:border-[#6f6f6f]
                                hover:shadow-md
                                active:scale-[0.98]"
                        >
                            확인
                        </button>

                        <button
                            type="button"
                            onClick={onDeleteAlert}
                            disabled={deleting}
                            className="h-12 w-full rounded-[14px]
                                border border-red-300 text-red-600 bg-white
                                transition-all duration-200
                                flex items-center justify-center
                                text-[18px] font-semibold
                                hover:bg-red-50
                                active:scale-[0.98]
                                disabled:opacity-50"
                        >
                            {deleting ? "삭제 중..." : "알림 삭제하기"}
                        </button>
                    </>
                ) : isHistoryPast ? (
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="h-12 w-full rounded-[14px]
                            bg-white text-black
                            border border-[#909090]
                            transition-all duration-200
                            flex items-center justify-center
                            text-[18px] font-semibold
                            shadow-sm
                            hover:bg-[#f5f5f5]
                            hover:border-[#6f6f6f]
                            hover:shadow-md
                            active:scale-[0.98]"
                    >
                        확인
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onClickSms}
                        className="h-12 w-full rounded-[14px] bg-[#FFE89F] transition hover:bg-[#FFD966]
                            flex items-center justify-center gap-2 text-[18px] font-semibold text-black shadow-sm"
                    >
                        <Bell className="h-5 w-5" strokeWidth={2} />
                        문자 메시지로 알림 받기
                    </button>
                )}
            </div>
        </div>
    );
}
