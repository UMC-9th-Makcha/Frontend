import type { PathType } from "../../../types/map";
import type { RouteConfirmSegment } from "../types/routeConfirm";
import type { AlarmRoute } from "../types/alarm";
import type { Candidate, CandidateStep } from "../types/candidate";
import { formatHHMM, formatMinutesLeftText } from "./format";

export const busTypeToMapType = (t?: number | null): PathType => {
    if (t === 4 || t === 6 || t === 14 || t === 15) return "BUS_RED";
    if (t === 11) return "BUS_BLUE";
    if (t === 1 || t === 2 || t === 3 || t === 12) return "BUS_GREEN";
    return "BUS_BLUE";
};

export const subwayTypeToMapType = (t?: number | null): PathType => {
    const n = Number(t);
    if (Number.isFinite(n)) {
        if (n >= 1 && n <= 9) return `SUBWAY_${n}` as PathType;
        if (n === 116) return "SUBWAY_SUIN";
    }
    return "SUBWAY_2";
};

export const stepsToSegments = (steps: CandidateStep[]): RouteConfirmSegment[] => {
    return steps.map((s) => {
        if (s.type === "WALK") {
            return {
                mode: "WALK",
                durationMin: s.section_time ?? 0,
                distanceM: s.distance ?? undefined,
                mapType: "WALK",
            };
        }

        if (s.type === "SUBWAY" || (typeof s.type === "string" && s.type.startsWith("SUBWAY"))) {
            const lineLabel =
                s.subway_lines?.[0]?.replace("수도권 ", "").replace(" ", "") ??
                (Number.isFinite(s.subway_type ?? NaN) ? `${s.subway_type}호선` : "지하철");

            return {
                mode: "SUBWAY",
                lineLabel,
                from: s.from?.name ?? "출발",
                to: s.to?.name ?? "도착",
                durationMin: s.section_time ?? 0,
                stops: s.station_count ?? undefined,
                mapType: subwayTypeToMapType(s.subway_type),
            };
        }

        if (s.type === "BUS" || (typeof s.type === "string" && s.type.startsWith("BUS"))) {
            const busNo = s.bus_numbers?.[0] ?? "버스";
            const busType = s.bus_types?.[0] ?? null;

            return {
                mode: "BUS",
                lineLabel: busNo,
                from: s.from?.name ?? "출발",
                to: s.to?.name ?? "도착",
                durationMin: s.section_time ?? 0,
                stops: s.station_count ?? undefined,
                mapType: busTypeToMapType(busType),
            };
        }

        return {
            mode: "WALK",
            durationMin: s.section_time ?? 0,
            distanceM: s.distance ?? undefined,
            mapType: "WALK",
        };
    });
};

export const extractChips = (cand: Candidate): string[] => {
    const steps = cand.detail?.steps ?? [];
    const chips: string[] = [];

    for (const s of steps) {
        // 1) 일반 SUBWAY 타입
        if (s.type === "SUBWAY") {
            const lineName = s.subway_lines?.[0];
            if (lineName) chips.push(lineName.replace("수도권 ", "").replace(" ", ""));
            continue;
        }

        // 2) 문자열 타입 처리
        if (typeof s.type === "string" && s.type.startsWith("SUBWAY_")) {
            const n = s.subway_type ?? Number(s.type.replace("SUBWAY_", ""));
            if (Number.isFinite(n)) chips.push(`${n}호선`);
            else chips.push("지하철");
            continue;
        }

        // 3) BUS / BUS_* 타입
        if (s.type === "BUS" || (typeof s.type === "string" && s.type.startsWith("BUS"))) {
            const nums: string[] = s.bus_numbers ?? [];
            nums.forEach((x) => chips.push(x));
            continue;
        }
    }

    return chips.length ? chips : (cand.tags ?? []);
};

export const candidatesToRoutes = (candidates: Candidate[]): AlarmRoute[] => {
    return candidates.map((c) => {
        const minutesLeft = c.card?.minutes_left ?? 0;

        return {
            id: c.candidate_key,
            cacheKey: c.route_token,
            routeToken: c.route_token,
            isOptimal: c.is_optimal,
            routeType: c.tags?.includes("SUBWAY")
                ? "SUBWAY"
                : c.tags?.includes("NIGHT_BUS")
                    ? "NIGHT_BUS"
                    : "BUS",
            lines: extractChips(c),

            minutesLeft,
            timeUntilDeparture: formatMinutesLeftText(minutesLeft),
            departureTime: formatHHMM(c.card?.deadline_at),
            totalDurationMin: c.card?.traveled_time ?? 0,
            transferCount: c.card?.transfer_count ?? 0,
            walkingTimeMin: c.card?.walk_time ?? 0,
            segments: stepsToSegments(c.detail?.steps ?? []),
        };
    });
};