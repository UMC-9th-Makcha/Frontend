import { useMemo } from "react";
import type { CurrentAlarm, HistoryItem } from "../types/history";
import { useAlertsHistory } from "./useAlertsHistory";
import { toHHMM, toKoreanDate, toMonthLabel, toUntilText } from "../utils/date";
import { CURRENT_ALARM_MOCK, MONTH_SECTIONS_MOCK } from "../mocks/historyMock";

type Params = { USE_MOCK: boolean; };

export function useHistorySections({ USE_MOCK }: Params) {
    const { data: alertsHistory } = useAlertsHistory();

    const currentAlarm: CurrentAlarm | null = useMemo(() => {
        const ca = alertsHistory?.current_alert;
        if (!ca) return null;

        const minutesLeft = ca.minutes_left ?? 0;

        return {
            notificationId: Number(ca.id),
            routeId: String(ca.route_id ?? ""),
            isOptimal: Boolean(ca.is_optimal),
            lines: ca.lines ?? [],
            departureTime: toHHMM(ca.scheduled_time),
            minutesLeft,
            timeUntilDepartureText: toUntilText(minutesLeft),
            totalDurationMin: ca.total_duration_min ?? 0,
            transferCount: ca.transfer_count ?? 0,
            walkingTimeMin: ca.walking_time_min ?? 0,
        };
    }, [alertsHistory]);

    const monthSections = useMemo(() => {
        const list = alertsHistory?.history ?? [];
        const map = new Map<string, HistoryItem[]>();

        for (const it of list) {
            const yyyyMm = it.departure_time.slice(0, 7);
            const monthLabel = toMonthLabel(yyyyMm);

            const item: HistoryItem = {
                id: it.id,
                routeId: it.id,
                notificationId: it.notification_id,
                date: toKoreanDate(it.departure_time),
                from: it.origin,
                to: it.destination,
                departAt: toHHMM(it.departure_time),
                arriveAt: toHHMM(it.arrival_time),
            };

            const arr = map.get(monthLabel) ?? [];
            arr.push(item);
            map.set(monthLabel, arr);
        }

        return Array.from(map.entries()).map(([monthLabel, items]) => ({
            monthLabel,
            items,
        }));
    }, [alertsHistory]);

    const finalCurrentAlarm = USE_MOCK ? CURRENT_ALARM_MOCK : currentAlarm;
    const finalMonthSections = USE_MOCK ? MONTH_SECTIONS_MOCK : monthSections;

    return {
        finalCurrentAlarm,
        finalMonthSections,
    };
}
