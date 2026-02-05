import { useMemo, useState } from "react";
import Panel from "../../components/common/Panel";
import CurrentAlarmCard from "./components/CurrentAlarmCard";
import PastSummaryCard from "./components/PastSummaryCard";
import MonthSection from "./components/MonthSection";
import SaveReportPanel from "./components/SaveReportPanel";
import { CURRENT_ALARM_MOCK, MONTH_SECTIONS_MOCK } from "./mocks/historyMock";
import type { HistoryItem, PastSummary } from "./types/history";
import { ROUTE_CONFIRM_DETAIL_MOCK } from "../Alarm/mocks/routeConfirmMock";
import RouteConfirmPanel from "../Alarm/panels/RouteConfirmPanel";
import type { AlarmRoute } from "../Alarm/types/alarm";
import { useSaveReports } from "./hooks/useSaveReports";

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

const toMonthLabel = (yyyyMm: string) => `${Number(yyyyMm.split("-")[1])}월`;

const HistoryHome = () => {
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
    if (!saveReport || saveReport.chart.length === 0) return `${new Date().getFullYear()}년`;
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

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const confirmRoute: AlarmRoute | null = useMemo(() => {
    if (!selectedItem) return null;
    return {
      id: selectedItem.routeId,
      isOptimal: true,
      routeType: "SUBWAY",
      lines: [],
      departureTime: selectedItem.departAt,
      timeUntilDeparture: "",
      totalDurationMin: 0,
      transferCount: 0,
      walkingTimeMin: 0,
    } as AlarmRoute;
  }, [selectedItem]);

  const confirmDetail = useMemo(() => {
    if (!selectedItem) return undefined;
    return ROUTE_CONFIRM_DETAIL_MOCK[selectedItem.routeId];
  }, [selectedItem]);

  {/* 상세보기 클릭 → Panel 열기 */ }
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

      <main className="h-full w-full overflow-y-auto p-5 pt-13 md:p-10 md:pt-24">
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
              <CurrentAlarmCard alarm={CURRENT_ALARM_MOCK} />
            </div>
          </section>

          {/* 오른쪽: PC에서만 */}
          <section className="min-w-0 md:pl-10">
            <h1 className="text-[32px] font-medium text-black dark:text-white">
              과거 알림 내역
            </h1>

            <div className="mt-7">
              <PastSummaryCard
                summary={pastSummary}
                onDetail={() => {
                  setIsSaveReportOpen(true);
                  setReportMonth(undefined);
                }}
              />
            </div>

            <div className="mt-9 space-y-10">
              {MONTH_SECTIONS_MOCK.map((sec) => (
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
              onClickSms={() => console.log("SMS 클릭")}
            />
          </Panel>
        </div>
      )}
    </div>
  );
};

export default HistoryHome;