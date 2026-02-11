import { useMemo, useState } from "react";
import type { HistoryItem, PastSummary } from "../types/history";
import { useSaveReports } from "./useSaveReports";
import { toHHMM, toKoreanDate, toMonthLabel } from "../utils/date";

type Params = {
    USE_MOCK: boolean;
};

export function useHistorySaveReport({ USE_MOCK }: Params) {
    // 리포트 패널 상태
    const [isOpen, setIsOpen] = useState(false);
    const [reportMonth, setReportMonth] = useState<string | undefined>(undefined);

    // 절약 리포트 API 호출
    const { data: saveReport, isLoading } = useSaveReports(isOpen, reportMonth);

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

    // 이번 달 총 절약 금액
    const totalSavedAmount = useMemo(() => {
        if (!saveReport) return 0;
        return saveReport.items.reduce((sum, it) => sum + (it.savedFareWon ?? 0), 0);
    }, [saveReport]);

    // 과거 요약 카드 데이터
    const pastSummary: PastSummary = useMemo(() => {
        return {
            thisMonthTaxiCost: totalSavedAmount,
            savedCount: reportItems.length,
        };
    }, [totalSavedAmount, reportItems.length]);

    // 연도 라벨
    const yearLabel = useMemo(() => {
        if (!saveReport || saveReport.chart.length === 0) {
            return `${new Date().getFullYear()}년`;
        }
        return `${saveReport.chart[0].month.split("-")[0]}년`;
    }, [saveReport]);

    // 차트 데이터
    const chartData = useMemo(() => {
        if (!saveReport) return [];
        return saveReport.chart.map((c) => ({
            month: toMonthLabel(c.month),
            value: c.savedAmount,
            highlight: c.highlight,
        }));
    }, [saveReport]);

    const open = (month?: string) => {
        setIsOpen(true);
        setReportMonth(month);
    };

    const close = () => setIsOpen(false);

    return {
        // panel control
        isOpen,
        open,
        close,
        setReportMonth,

        // panel data
        reportMonth,
        loading: isLoading,
        reportItems,
        totalSavedAmount,
        pastSummary,
        yearLabel,
        chartData,

        // debug 
        USE_MOCK,
    };
}
