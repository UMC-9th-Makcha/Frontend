export type CurrentAlarm = {
    notificationId: number;
    routeId?: string;
    isOptimal?: boolean;
    lines: string[];
    departureTime?: string;
    timeUntilDepartureText?: string;
    totalDurationMin: number;
    transferCount: number;
    walkingTimeMin: number;
    minutesLeft: number;
};

export type PastSummary = {
    thisMonthTaxiCost: number;
    savedCount: number;
};

export type HistoryItem = {
    id: string;
    notificationId?: string;
    routeId: string;
    date: string;
    from: string;
    to: string;
    departAt: string;
    arriveAt: string;
    savedAmount?: number;
    routeToken?: string;
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

        route_token: string | null;
        route_id: string | null;

        is_optimal: boolean;
        lines: string[];

        total_duration_min: number;
        transfer_count: number;
        walking_time_min: number;
        minutes_left: number;
    };

    history: Array<{
        id: string;
        notification_id?: string;
        origin: string;
        destination: string;
        departure_time: string;
        arrival_time: string;
        duration: number;
    }>;
};