export type RouteConfirmMode = "SUBWAY" | "BUS" | "WALK";

export type RouteConfirmSegment =
    | {
        mode: "WALK";
        durationMin: number;
        distanceM?: number;
    }
    | {
        mode: "SUBWAY" | "BUS";
        lineLabel: string; // "2호선", "472"
        from: string;      
        to: string;       
        durationMin: number;
        stops?: number;
    };

export type RouteConfirmDetail = {
    etaText: string; // "00:40 도착"
    segments: RouteConfirmSegment[];
};
