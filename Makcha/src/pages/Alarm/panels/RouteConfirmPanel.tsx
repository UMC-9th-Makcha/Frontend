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
    mode?: "alarm" | "history" | "historyPast";
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

const normalizeSubwayLine = (raw: string) => {
    const t = (raw ?? "").trim();
    const m = t.match(/(\d+)\s*호선/);
    if (m?.[1]) return `${m[1]}호선`;
    return t;
};

const normalizeLineForChip = (raw: string) => {
    const code = raw.match(/\d+/)?.[0];
    const named = code && SUBWAY_CODE_TO_NAME[code] ? SUBWAY_CODE_TO_NAME[code] : raw;
    return LINE_SHORT_NAME[named] ?? named;
};

const baseBusNumber = (raw: string) => {
    const t = (raw ?? "").trim();
    const m = t.match(/^\d+/);
    return m ? m[0] : t;
};

type BaseStep = {
    type: string;
    section_time: number;
    distance: number;
};

type WalkStep = BaseStep & { type: "WALK" };

type BusStep = BaseStep & {
    type: `BUS_${string}` | "BUS";
    bus_numbers: string[];
};

type SubwayStep = BaseStep & {
    type: `SUBWAY_${string}` | "SUBWAY";
    subway_lines: string[];
};

type RouteStep = WalkStep | BusStep | SubwayStep | BaseStep;

type ChipGroup = { labels: string[] };

const isWalkStep = (s: RouteStep): s is WalkStep => s.type === "WALK";
const isBusStep = (s: RouteStep): s is BusStep =>
    s.type.startsWith("BUS") && "bus_numbers" in s && Array.isArray((s as BusStep).bus_numbers);
const isSubwayStep = (s: RouteStep): s is SubwayStep =>
    s.type.startsWith("SUBWAY") && "subway_lines" in s && Array.isArray((s as SubwayStep).subway_lines);

const buildChipGroupsFromSteps = (steps: RouteStep[]): ChipGroup[] => {
    const groups: ChipGroup[] = [];

    for (const step of steps) {
        if (isWalkStep(step)) continue;

        if (isBusStep(step)) {
            const nums = step.bus_numbers ?? [];
            if (!nums.length) continue;

            const uniq = new Map<string, true>();
            for (const n of nums) {
                const base = baseBusNumber(n);
                if (base) uniq.set(base, true);
            }

            groups.push({ labels: [...uniq.keys()] });
            continue;
        }

        if (isSubwayStep(step)) {
            const lines = step.subway_lines ?? [];
            if (!lines.length) continue;
            groups.push({ labels: lines.map(normalizeSubwayLine) });
            continue;
        }

        const raw = step.type ?? "";
        const code = raw.match(/\d+/)?.[0];
        const named = code && SUBWAY_CODE_TO_NAME[code] ? SUBWAY_CODE_TO_NAME[code] : raw;
        const short = LINE_SHORT_NAME[named] ?? named;

        groups.push({ labels: [short] });
    }

    return groups;
};

const normalizeRouteLineFallback = (raw: string) => {
    const t = (raw ?? "").trim();
    if (!t) return "";

    if (t.includes("호선")) return normalizeSubwayLine(t);

    if (/^\d+/.test(t)) return baseBusNumber(t);

    return normalizeLineForChip(t);
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

    const fallbackLines = (route.lines ?? [])
        .map(normalizeRouteLineFallback)
        .filter((v) => v.length > 0);

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
