import { useMemo, useState } from "react";
import Panel from "../../components/common/Panel";
import CurrentAlarmCard from "./components/CurrentAlarmCard";
import PastSummaryCard from "./components/PastSummaryCard";
import MonthSection from "./components/MonthSection";
import SaveReportPanel from "./components/SaveReportPanel";
import type { CurrentAlarm, HistoryItem, PastSummary } from "./types/history";
import { ROUTE_CONFIRM_DETAIL_MOCK } from "../Alarm/mocks/routeConfirmMock";
import RouteConfirmPanel from "../Alarm/panels/RouteConfirmPanel";
import type { AlarmRoute } from "../Alarm/types/alarm";
import { useSaveReports } from "./hooks/useSaveReports";
import { useAlertsHistory } from "./hooks/useAlertsHistory";
import { useNavigate } from "react-router-dom";
import { CURRENT_ALARM_MOCK, PAST_SUMMARY_MOCK, MONTH_SECTIONS_MOCK } from "./mocks/historyMock"; // mock 

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

  if (hours === 0) {
    return `출발까지 ${minutes}분`;
  }
  if (minutes === 0) {
    return `출발까지 ${hours}시간`;
  }
  return `출발까지 ${hours}시간 ${minutes}분`;
};


const toMonthLabel = (yyyyMm: string) => `${Number(yyyyMm.split("-")[1])}월`;

const HistoryHome = () => {
  const navigate = useNavigate();

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

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const confirmDetail = useMemo(() => {
    if (!selectedItem) return undefined;
    return ROUTE_CONFIRM_DETAIL_MOCK[selectedItem.routeId];
  }, [selectedItem]);

  const confirmRoute: AlarmRoute | null = useMemo(() => {
    if (!selectedItem || !confirmDetail) return null;

    const totalDurationMin = confirmDetail.segments.reduce(
      (sum, s) => sum + s.durationMin,
      0
    );

    return {
      id: selectedItem.routeId,
      cacheKey: "",
      routeToken: "",
      isOptimal: true,
      routeType: "SUBWAY",
      lines: [],
      departureTime: selectedItem.departAt,
      minutesLeft: 0,
      timeUntilDeparture: "",
      totalDurationMin,
      transferCount: 0,
      walkingTimeMin: 0,
    };
  }, [selectedItem, confirmDetail]);

  // 상세보기 클릭 → Panel 열기
  const openConfirm = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-white dark:bg-makcha-navy-900">
      <SaveReportPanel
        open={isSaveReportOpen}
        onClose={() => setIsSaveReportOpen(false)}
        totalSavedAmount={totalSavedAmount}
        items={reportItems}
        loading={saveReportLoading}
        yearLabel={yearLabel}
        chartData={chartData}
      />

      <main className="h-full w-full overflow-y-auto px-5 pb-5 pt-3 md:p-10 md:pt-24">
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* 구분선: PC에서만 */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 translate-x-[20px] hidden w-px bg-[#E2E2E2] dark:bg-makcha-navy-800 md:block" />

          {/* 왼쪽 */}
          <section className="min-w-0">
            <h1 className="text-[32px] font-medium text-black dark:text-white">
              알림 내역
            </h1>

            <p className="mt-[10px] text-[20px] text-[#5F5F5F] dark:text-makcha-navy-200">
              현재 신청한 알림을 확인할 수 있어요
            </p>

            <div className="mt-7">
              <CurrentAlarmCard
                alarm={finalCurrentAlarm}
                onCreate={() => navigate("/alarm")}
              />
            </div>
          </section>

          {/* 오른쪽: PC에서만 */}
          <section className="min-w-0 md:pl-10">
            <h1 className="text-[32px] font-medium text-black dark:text-white">
              과거 알림 내역
            </h1>

            <div className="mt-7">
              <PastSummaryCard
                summary={finalPastSummary}
                onDetail={() => {
                  setIsSaveReportOpen(true);
                  setReportMonth(undefined);
                }}
              />
            </div>

            <div className="mt-9 space-y-10">
              {finalMonthSections.map((sec) => (
                <MonthSection
                  key={sec.monthLabel}
                  monthLabel={sec.monthLabel}
                  items={sec.items}
                  onDetail={openConfirm}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* 상세 패널 오버레이 */}
      {isConfirmOpen && confirmRoute && confirmDetail && (
        <div className="absolute inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/10 dark:bg-black/30 transition-opacity"
            onClick={closeConfirm}
          />

          <Panel width="md:w-100" disablePadding className="shadow-2xl">
            <RouteConfirmPanel
              route={confirmRoute}
              detail={confirmDetail}
              onBack={closeConfirm}
              onConfirm={closeConfirm}
              mode="history"
            />
          </Panel>
        </div>
      )}
    </div>
  );
};

export default HistoryHome;