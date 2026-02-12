import { useMemo, useState } from "react";
import type { CurrentAlarm, HistoryItem, PastSummary } from "../types/history";
import { useSaveReports } from "./useSaveReports";
import { useAlertsHistory } from "./useAlertsHistory";
import { CURRENT_ALARM_MOCK, PAST_SUMMARY_MOCK, MONTH_SECTIONS_MOCK } from "../mocks/historyMock";

const toKoreanDate = (iso: string) => {
    const d = new Date(iso);
    const yy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yy}. ${mm}. ${dd}`;
};

const toHHMM = (iso: string) => {
    const d = new Date(iso);
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mi}`;
};

const toUntilText = (min: number) => {
    if (min <= 0) return "곧 출발";

    const hours = Math.floor(min / 60);
    const minutes = min % 60;

    if (hours === 0) return `출발까지 ${minutes}분`;
    if (minutes === 0) return `출발까지 ${hours}시간`;
    return `출발까지 ${hours}시간 ${minutes}분`;
};

const toMonthLabel = (yyyyMm: string) => `${Number(yyyyMm.split("-")[1])}월`;

export function useHistoryHomeViewModel() {
    const USE_MOCK =
        import.meta.env.DEV && import.meta.env.VITE_USE_HISTORY_MOCK === "true";

    const [isSaveReportOpen, setIsSaveReportOpen] = useState(false);
    const [reportMonth, setReportMonth] = useState<string | undefined>(undefined);

    const { data: saveReport, isLoading: saveReportLoading } = useSaveReports(
        isSaveReportOpen,
        reportMonth
    );

    const reportItems: HistoryItem[] = useMemo(() => {
        if (!saveReport) return [];
        return saveReport.items.map((it) => ({
            id: it.notificationHistoryId,
            routeId: it.notificationHistoryId,
            date: toKoreanDate(it.departureDatetime),
            from: it.originName,
            to: it.destinationName,
            departAt: toHHMM(it.departureDatetime),
            arriveAt: toHHMM(it.arrivalDatetime),
            savedAmount: it.savedFareWon,
        }));
    }, [saveReport]);

    const totalSavedAmount = useMemo(() => {
        if (!saveReport) return 0;
        return saveReport.items.reduce((sum, it) => sum + (it.savedFareWon ?? 0), 0);
    }, [saveReport]);

    const pastSummary: PastSummary = useMemo(() => {
        return {
            thisMonthTaxiCost: totalSavedAmount,
            savedCount: reportItems.length,
        };
    }, [totalSavedAmount, reportItems.length]);

    const yearLabel = useMemo(() => {
        if (!saveReport || saveReport.chart.length === 0)
            return `${new Date().getFullYear()}년`;
        return `${saveReport.chart[0].month.split("-")[0]}년`;
    }, [saveReport]);

    const chartData = useMemo(() => {
        if (!saveReport) return [];
        return saveReport.chart.map((c) => ({
            month: toMonthLabel(c.month),
            value: c.savedAmount,
            highlight: c.highlight,
        }));
    }, [saveReport]);

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

    const finalCurrentAlarm: CurrentAlarm | null = USE_MOCK
        ? CURRENT_ALARM_MOCK
        : currentAlarm;

    const finalPastSummary: PastSummary = USE_MOCK
        ? PAST_SUMMARY_MOCK
        : pastSummary;

    const finalMonthSections = USE_MOCK ? MONTH_SECTIONS_MOCK : monthSections;

    const saveReportPanelProps = useMemo(() => {
        return {
            open: isSaveReportOpen,
            onClose: () => setIsSaveReportOpen(false),
            totalSavedAmount,
            items: reportItems,
            loading: saveReportLoading,
            yearLabel,
            chartData,

            onDetail: () => {
                setIsSaveReportOpen(true);
                setReportMonth(undefined);
            },
        };
    }, [
        isSaveReportOpen,
        totalSavedAmount,
        reportItems,
        saveReportLoading,
        yearLabel,
        chartData,
    ]);

    return {
        saveReportPanelProps,
        finalCurrentAlarm,
        finalPastSummary,
        finalMonthSections,
    };
}
