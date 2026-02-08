import type { RouteConfirmSegment } from "./routeConfirm";

export type AlarmRoute = {
    id: string;                
    routeToken: string;     
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
