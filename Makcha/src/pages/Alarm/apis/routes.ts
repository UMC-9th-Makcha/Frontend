import { api } from "../../../apis/api";
import type { AlarmRoute } from "../types/alarm";

type RouteCandidatesResponse = {
    candidate_key: string;
    route_token: string;
    is_optimal: boolean;
    tags: Array<"SUBWAY" | "BUS" | "NIGHT_BUS" | string>;

    card: {
        traveled_time: number;
        transfer_count: number;
        walk_time: number;
        deadline_at: string;
        minutes_left: number;
    };
};

type BaseResponse<T> = {
    successCode: string;
    statusCode: number;
    message: string;
    result: T;
};

export type RouteCandidatesPointBody = {
    lat: number;
    lng: number;
    title: string;
    roadAddress: string;
    detailAddress?: string;
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
        totalDurationMin: r.card.traveled_time,
        transferCount: r.card.transfer_count,
        walkingTimeMin: r.card.walk_time,
        departureTime: undefined,
        cacheKey: r.route_token,
    };
}

export async function postRouteCandidates(body: {
    origin: RouteCandidatesPointBody;
    destination: RouteCandidatesPointBody;
}): Promise<AlarmRoute[]> {
    const { data } = await api.post<BaseResponse<{ candidates: RouteCandidatesResponse[] }>>(
        "/api/routes/candidates",
        body
    );

    const list = data.result?.candidates ?? [];
    return list.map(toAlarmRoute);
}

export type PolylinePoint = { lat: number; lng: number };

export type PolylinePath = {
    class: number;
    type: number;
    map_type?: string;
    order?: number;
    points: PolylinePoint[];
};

export type RoutePolylinesResult = {
    route_token: string;
    map_object: string;
    paths: PolylinePath[];
    boundary?: { top: number; left: number; bottom: number; right: number };
};

export async function fetchRoutePolylines(routeToken: string): Promise<RoutePolylinesResult> {
    const { data } = await api.get<BaseResponse<RoutePolylinesResult>>(
        `/api/routes/polylines/${encodeURIComponent(routeToken)}`
    );
    return data.result;
}
