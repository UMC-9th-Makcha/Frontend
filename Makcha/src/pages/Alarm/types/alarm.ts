import type { RouteConfirmSegment } from "./routeConfirm";

export type AlarmRoute = {
    id: string;                 // candidate_key
    routeToken: string;         // route_token
    isOptimal: boolean;
    routeType: "SUBWAY" | "BUS" | "NIGHT_BUS";
    lines: string[];
    minutesLeft: number;
    timeUntilDeparture: string;
    totalDurationMin: number;
    transferCount: number;
    walkingTimeMin: number;
    departureTime?: string;
    cacheKey?: string;
    segments?: RouteConfirmSegment[];
};
