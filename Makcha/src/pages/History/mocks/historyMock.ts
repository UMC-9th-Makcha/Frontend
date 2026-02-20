import type { CurrentAlarm, MonthSectionData, PastSummary } from "../types/history";

export const CURRENT_ALARM_MOCK: CurrentAlarm | null = null;
/*export const CURRENT_ALARM_MOCK: CurrentAlarm = {
    notificationId: 4,
    routeId: "r1",
    isOptimal: true,
    lines: ["2호선", "472"],
    departureTime: "23:55",
    timeUntilDepartureText: "출발까지 12분",
    totalDurationMin: 45,
    transferCount: 1,
    walkingTimeMin: 9,
};*/

export const PAST_SUMMARY_MOCK: PastSummary = {
    //thisMonthTaxiCost: 0,
    //savedCount: 0,
    thisMonthTaxiCost: 125000,
    savedCount: 5,
};

export const MONTH_SECTIONS_MOCK: MonthSectionData[] = [
    {
        monthLabel: "2025년 12월",
        //items: [],
        items: [
            {
                id: "h1",
                routeId: "r1",
                date: "2025. 12. 03",
                from: "강남역",
                to: "수원역",
                departAt: "23:55",
                arriveAt: "25:10",
                savedAmount: 325000,
            },
        ],
    },
];