import { api } from "../../../apis/api";
import type { AlarmRoute } from "../types/alarm";

type RouteCandidatesResponse = {
    candidate_key: string;
    route_token: string;
    is_optimal: boolean;
    tags: Array<"SUBWAY" | "BUS" | "NIGHT_BUS" | string>;

    card: {
        traveler_time: number;
        transfer_count: number;
        walk_time: number;
        deadline_at: string;
        minutes_left: number;
    };
};

function toAlarmRoute(r: RouteCandidatesResponse): AlarmRoute {
    const minutesLeft = r.card.minutes_left;

    return {
        id: r.candidate_key,
        routeToken: r.route_token,
        isOptimal: r.is_optimal,

        routeType: r.tags.includes("SUBWAY")
            ? "SUBWAY"
            : r.tags.includes("NIGHT_BUS")
                ? "NIGHT_BUS"
                : "BUS",

        lines: r.tags.filter((t) => t !== "SUBWAY" && t !== "BUS" && t !== "NIGHT_BUS"),
        minutesLeft,
        timeUntilDeparture: minutesLeft <= 0 ? "지금 출발" : `출발까지 ${minutesLeft}분`,
        totalDurationMin: r.card.traveler_time,
        transferCount: r.card.transfer_count,
        walkingTimeMin: r.card.walk_time,
        departureTime: undefined,
        cacheKey: r.route_token,
    };
}

export async function postRouteCandidates(body: {
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
}): Promise<AlarmRoute[]> {
    const { data } = await api.post<{ result: RouteCandidatesResponse[] }>(
        "/api/routes/candidates",
        body
    );

    const list = data.result ?? [];
    return list.map(toAlarmRoute);
}
