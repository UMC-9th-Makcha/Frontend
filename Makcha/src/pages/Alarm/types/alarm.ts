export type AlarmRoute = {
    id: string;
    isOptimal: boolean;
    routeType: "SUBWAY" | "BUS" | "NIGHT_BUS";
    lines: string[];
    departureTime: string;
    timeUntilDeparture: string;
    totalDurationMin: number;
    transferCount: number;
    walkingTimeMin: number;
};
