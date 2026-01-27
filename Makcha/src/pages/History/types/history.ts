export type CurrentAlarm = {
    routeId: string;
    isOptimal: boolean;
    lines: string[];
    departureTime: string;
    timeUntilDepartureText: string;
    totalDurationMin: number;
    transferCount: number;
    walkingTimeMin: number;
};

export type PastSummary = {
    thisMonthTaxiCost: number;
    savedCount: number;
};

export type HistoryItem = {
    id: string;
    routeId: string;
    date: string;
    from: string;
    to: string;
    departAt: string;
    arriveAt: string;
    savedAmount?: number;
};

export type MonthSectionData = {
    monthLabel: string;
    items: HistoryItem[];
};
