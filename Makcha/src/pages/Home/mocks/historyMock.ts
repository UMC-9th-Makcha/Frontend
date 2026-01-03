export type CurrentAlarm = {
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

// export const CURRENT_ALARM_MOCK: CurrentAlarm | null = null;
// 알림이 있는 상태로 보려면 아래 주석 해제
export const CURRENT_ALARM_MOCK: CurrentAlarm = {
    isOptimal: true,
    lines: ["2호선", "4호선"],
    departureTime: "23:55",
    timeUntilDepartureText: "출발까지 12분",
    totalDurationMin: 45,
    transferCount: 1,
    walkingTimeMin: 9,
};

export const PAST_SUMMARY_MOCK: PastSummary = {
    thisMonthTaxiCost: 0,
    savedCount: 0,
    // thisMonthTaxiCost: 125000,
    // savedCount: 5,
};

export const MONTH_SECTIONS_MOCK: MonthSectionData[] = [
    {
        monthLabel: "2025년 12월",
        items: [],
        //items: [
        //  {
        // id: "h1",
        // date: "2025. 12. 03",
        // from: "강남역",
        // to: "수원역",
        // departAt: "23:55",
        // arriveAt: "25:10",
        // savedAmount: 325000,
        // },
        //  ],
    },
];
