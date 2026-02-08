import type { PathType } from "../../../types/map";

export type RouteConfirmSegment =
    | {
        mode: "WALK";
        durationMin: number;
        distanceM?: number;
        mapType?: PathType; 
    }
    | {
        mode: "SUBWAY";
        lineLabel: string;
        from: string;
        to: string;
        durationMin: number;
        stops?: number;
        mapType?: PathType; 
    }
    | {
        mode: "BUS";
        lineLabel: string;
        from: string;
        to: string;
        durationMin: number;
        stops?: number;
        mapType?: PathType; 
    };

export type RouteConfirmDetail = {
    etaText: string;
    segments: RouteConfirmSegment[];
};
