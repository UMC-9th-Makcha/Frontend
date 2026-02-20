export const SUBWAY_CODE_TO_NAME: Record<string, string> = {
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

export const LINE_SHORT_NAME: Record<string, string> = {
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

export const normalizeSubwayLine = (raw: string) => {
    const t = (raw ?? "").trim();
    const m = t.match(/(\d+)\s*호선/);
    if (m?.[1]) return `${m[1]}호선`;
    return t;
};

export const normalizeLineForChip = (raw: string) => {
    const code = raw.match(/\d+/)?.[0];
    const named = code && SUBWAY_CODE_TO_NAME[code] ? SUBWAY_CODE_TO_NAME[code] : raw;
    return LINE_SHORT_NAME[named] ?? named;
};

export const baseBusNumber = (raw: string) => {
    const t = (raw ?? "").trim();
    const m = t.match(/^\d+/);
    return m ? m[0] : t;
};

export type BaseStep = {
    type: string;
    section_time: number;
    distance: number;
};

export type WalkStep = BaseStep & { type: "WALK" };

export type BusStep = BaseStep & {
    type: `BUS_${string}` | "BUS";
    bus_numbers: string[];
};

export type SubwayStep = BaseStep & {
    type: `SUBWAY_${string}` | "SUBWAY";
    subway_lines: string[];
};

export type RouteStep = WalkStep | BusStep | SubwayStep | BaseStep;

export type ChipGroup = { labels: string[] };

export const isWalkStep = (s: RouteStep): s is WalkStep => s.type === "WALK";
export const isBusStep = (s: RouteStep): s is BusStep =>
    s.type.startsWith("BUS") && "bus_numbers" in s && Array.isArray((s as BusStep).bus_numbers);
export const isSubwayStep = (s: RouteStep): s is SubwayStep =>
    s.type.startsWith("SUBWAY") && "subway_lines" in s && Array.isArray((s as SubwayStep).subway_lines);

export const buildChipGroupsFromSteps = (steps: RouteStep[]): ChipGroup[] => {
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

export const normalizeRouteLineFallback = (raw: string) => {
    const t = (raw ?? "").trim();
    if (!t) return "";

    if (t.includes("호선")) return normalizeSubwayLine(t);
    if (/^\d+/.test(t)) return baseBusNumber(t);

    return normalizeLineForChip(t);
};
