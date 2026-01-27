import { Footprints, BusFront } from "lucide-react";
import type { RouteConfirmSegment } from "../types/routeConfirm";

const fmtMin = (min: number) => (min < 1 ? "1분 미만" : `${min}분`);

const extractSubwayNumber = (label: string) => {
    const m = label.match(/\d+/);
    return m?.[0] ?? label.replace("호선", "").trim().slice(0, 2);
};

const LineColor = (mode: RouteConfirmSegment["mode"]) => {
    if (mode === "SUBWAY") return "border-green-500";
    if (mode === "BUS") return "border-blue-500";
    return "border-gray-300 dark:border-white/20";
};

type Props = {
    segments: RouteConfirmSegment[];
};

export function RouteTimeline({ segments }: Props) {
    const firstTransit = segments.find((s) => s.mode !== "WALK") as
        | Extract<RouteConfirmSegment, { mode: "SUBWAY" | "BUS" }>
        | undefined;

    const startLabel = firstTransit?.from ?? "출발지";

    const lastTransit = [...segments].reverse().find((s) => s.mode !== "WALK") as
        | Extract<RouteConfirmSegment, { mode: "SUBWAY" | "BUS" }>
        | undefined;

    const endLabel = lastTransit?.to ?? "도착지";

    return (
        <div className="mt-6">
            <div className="relative flex gap-4">
                <div className="relative w-10 shrink-0">
                    <div className="absolute left-5 top-0 bottom-0 border-l-2 border-dashed border-gray-300 dark:border-white/20" />
                </div>

                <div className="min-w-0 flex-1">
                    <StationNode tone="start" label={startLabel} />

                    {segments.map((s, idx) => {
                        if (s.mode === "WALK") {
                            const meta = `${fmtMin(s.durationMin)}${typeof s.distanceM === "number" ? ` ${s.distanceM}m` : ""
                                }`;
                            return <WalkMeta key={`walk-${idx}`} meta={meta} />;
                        }

                        const transit = s as Extract<RouteConfirmSegment, { mode: "SUBWAY" | "BUS" }>;
                        const meta = `${fmtMin(transit.durationMin)}${typeof transit.stops === "number" ? ` | ${transit.stops}개 정거장` : ""
                            }`;

                        return (
                            <TransitBlock
                                key={`${transit.mode}-${idx}`}
                                mode={transit.mode}
                                lineLabel={transit.lineLabel}
                                from={transit.from}
                                to={transit.to}
                                meta={meta}
                                isLast={idx === segments.length - 1}
                            />
                        );
                    })}

                    {segments.length > 0 && segments[segments.length - 1].mode === "WALK" && (
                        <StationNode tone="end" label={endLabel} />
                    )}
                </div>
            </div>
        </div>
    );
}

function MarkerSlot({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={`absolute -left-[46px] top-1 ${className}`}>{children}</div>;
}

function StationNode({ tone, label }: { tone: "start" | "end"; label: string }) {
    const dotBase = "h-4 w-4";
    const dotColor = tone === "end" ? "bg-blue-500" : "bg-gray-500 dark:bg-white/30";

    return (
        <div className="relative pb-3">
            <MarkerSlot className="top-2 translate-x-[3px]">
                <div className={`rounded-full ${dotBase} ${dotColor}`} />
            </MarkerSlot>

            <p className="text-[18px] font-semibold text-gray-900 dark:text-white">{label}</p>
        </div>
    );
}

function WalkMeta({ meta }: { meta: string }) {
    return (
        <div className="relative pb-3">
            <div className="flex items-center gap-2 text-[14px] text-gray-600 dark:text-white/60">
                <Footprints className="h-4 w-4" />
                <span>{meta}</span>
            </div>
        </div>
    );
}

function TransitBadge({ mode, lineLabel }: { mode: "SUBWAY" | "BUS"; lineLabel: string }) {
    if (mode === "SUBWAY") {
        const n = extractSubwayNumber(lineLabel);
        return (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-[12px] font-bold text-white">
                {n}
            </div>
        );
    }

    return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
            <BusFront className="h-4 w-4" />
        </div>
    );
}

function TransitBlock({
    mode,
    lineLabel,
    from,
    to,
    meta,
    isLast,
}: {
    mode: "SUBWAY" | "BUS";
    lineLabel: string;
    from: string;
    to: string;
    meta: string;
    isLast: boolean;
}) {
    const colorBorder = LineColor(mode);

    return (
        <div className="relative pb-3">
            <div className="absolute -left-[46px] top-0 bottom-0 flex flex-col items-center">
                <div className="h-6 flex items-center">
                    <TransitBadge mode={mode} lineLabel={lineLabel} />
                </div>

                <div className={["flex-1 border-l-2 border-dashed", colorBorder].join(" ")} />

                <div className="h-6 flex items-center">
                    {isLast ? (
                        <div className="h-4 w-4 rounded-full bg-blue-500" />
                    ) : (
                        <TransitBadge mode={mode} lineLabel={lineLabel} />
                    )}
                </div>
            </div>

            <div className="pb-2">
                <p className="text-[18px] font-semibold text-gray-900 dark:text-white">{from}</p>
            </div>

            <div className="pb-2 text-[14px] text-gray-600 dark:text-white/60">{meta}</div>

            <div>
                <p className="text-[18px] font-semibold text-gray-900 dark:text-white">{to}</p>
            </div>
        </div>
    );
}
