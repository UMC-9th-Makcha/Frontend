export type CurrentAlarm = {
    notificationId: number;
    routeId?: string;
    isOptimal?: boolean;
    lines?: string[];
    departureTime?: string;
    timeUntilDepartureText?: string;
    totalDurationMin?: number;
    transferCount?: number;
    walkingTimeMin?: number;
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

export type ApiResponse<T> = {
    successCode: string;
    statusCode: number;
    message: string;
    result: T;
};

export type AlertsHistoryDto = {
    user_setting: {
        user_id: string;
        notify_mask: number;
        enabled: boolean;
        timeList: number[];
    };

    current_alert: null | {
        id: string;
        station_name: string;
        scheduled_time: string;
    };

    history: Array<{
        id: string;
        origin: string;
        destination: string;
        departure_time: string;
        arrival_time: string;
        duration: number;
    }>;
};
