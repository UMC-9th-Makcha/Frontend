import { ChevronLeft, ChevronRight, Bell } from "lucide-react";
import type { AlarmRoute } from "../types/alarm";
import type { RouteConfirmDetail } from "../types/routeConfirm";
import SegmentBar from "../components/SegmentBar";
import { RouteTimeline } from "../components/RouteTimeline";

type Props = {
    route: AlarmRoute;
    detail: RouteConfirmDetail;
    onBack: () => void;
    onConfirm: () => void;
    mode?: "alarm" | "history";
    onClickSms?: () => void;
    onDeleteAlert?: () => void;
    deleting?: boolean;
};

const SUBWAY_CODE_TO_NAME: Record<string, string> = {
    "91": "GTX-A",
    "101": "공항철도",
    "102": "자기부상철도",
    "104": "경의중앙선",
    "107": "에버라인",
    "108": "경춘선",
    "109": "신분당선",
    "110": "의정부경전철",
    "112": "경강선",
    "113": "우이신설선",
    "114": "서해선",
    "115": "김포골드라인",
    "116": "수인분당선",
    "117": "신림선",
};

const LINE_SHORT_NAME: Record<string, string> = {
    "GTX-A": "GTX",
    "공항철도": "공항",
    "자기부상철도": "자기부상",
    "경의중앙선": "경의",
    "에버라인": "에버",
    "경춘선": "경춘",
    "신분당선": "신분당",
    "의정부경전철": "의정부",
    "경강선": "경강",
    "우이신설선": "우이",
    "서해선": "서해",
    "김포골드라인": "김포",
    "수인분당선": "수인",
    "신림선": "신림",
};

const normalizeLineForChip = (raw: string) => {
    const code = raw.match(/\d+/)?.[0];
    const named =
        code && SUBWAY_CODE_TO_NAME[code]
            ? SUBWAY_CODE_TO_NAME[code]
            : raw;

    return LINE_SHORT_NAME[named] ?? named;
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
    const chips: string[] = (route.lines ?? []).map(normalizeLineForChip);
    const isHistory = mode === "history";

    return (
        <div className="flex min-h-full flex-col">
            {/* 상단 영역 */}
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

                        <p className="mt-2 text-[14px] text-gray-500 dark:text-white/60">
                            {detail.etaText}
                        </p>

                        <div className="-ml-12">
                            <SegmentBar segments={detail.segments} />
                        </div>

                        <div className="-ml-9">
                            <RouteTimeline segments={detail.segments} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 버튼 영역 */}
            <div className="mt-auto px-[16px] pt-4 space-y-3 pb-[max(80px,env(safe-area-inset-bottom))] md:pb-[20px]">
                {isHistory ? (
                    <>
                        {/* 확인 버튼 */}
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

                        {/* 알림 삭제하기 */}
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
