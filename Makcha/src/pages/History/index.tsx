import CurrentAlarmCard from "./components/CurrentAlarmCard";
import PastSummaryCard from "./components/PastSummaryCard";
import MonthSection from "./components/MonthSection";
import SaveReportPanel from "./components/SaveReportPanel";
import { useNavigate } from "react-router-dom";
import { PAST_SUMMARY_MOCK } from "./mocks/historyMock";
import HistoryPastConfirmOverlay from "./components/HistoryPastConfirmOverlay";
import { useHistoryPastConfirm } from "./hooks/useHistoryPastConfirm";
import { useHistorySaveReport } from "./hooks/useHistorySaveReport";
import { useHistorySections } from "./hooks/useHistorySections";

const HistoryHome = () => {
  const navigate = useNavigate();

  const USE_MOCK =
    import.meta.env.DEV && import.meta.env.VITE_USE_HISTORY_MOCK === "true";

  const saveReport = useHistorySaveReport({ USE_MOCK });
  const sections = useHistorySections({ USE_MOCK });
  const pastConfirm = useHistoryPastConfirm({ USE_MOCK });

  const finalPastSummary = USE_MOCK ? PAST_SUMMARY_MOCK : saveReport.pastSummary;

  return (
    <div className="relative w-full bg-white dark:bg-makcha-navy-900">
      {/* 절약 리포트 패널 */}
      <SaveReportPanel
        open={saveReport.isOpen}
        onClose={saveReport.close}
        totalSavedAmount={saveReport.totalSavedAmount}
        items={saveReport.reportItems}
        loading={saveReport.loading}
        yearLabel={saveReport.yearLabel}
        chartData={saveReport.chartData}
      />

      <main className="w-full px-5 pb-5 pt-3 md:p-10 md:pt-24">
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* PC 구분선 */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 translate-x-[20px] hidden w-px bg-[#E2E2E2] dark:bg-makcha-navy-800 md:block" />

          {/* 좌측 영역: 현재 알림 */}
          <section className="min-w-0">
            <h1 className="text-[32px] font-medium text-black dark:text-white">
              알림 내역
            </h1>

            <p className="mt-[10px] text-[20px] text-[#5F5F5F] dark:text-makcha-navy-200">
              현재 신청한 알림을 확인할 수 있어요
            </p>

            <div className="mt-7">
              <CurrentAlarmCard
                alarm={sections.finalCurrentAlarm}
                onCreate={() => navigate("/alarm")}
              />
            </div>
          </section>

          {/* 우측 영역: 과거 알림 내역 */}
          <section className="min-w-0 md:pl-10">
            <h1 className="text-[32px] font-medium text-black dark:text-white">
              과거 알림 내역
            </h1>

            <div className="mt-7">
              <PastSummaryCard
                summary={finalPastSummary}
                onDetail={() => saveReport.open(undefined)}
              />
            </div>

            <div className="mt-9 space-y-10">
              {sections.finalMonthSections.map((sec) => (
                <MonthSection
                  key={sec.monthLabel}
                  monthLabel={sec.monthLabel}
                  items={sec.items}
                  onDetail={pastConfirm.openConfirm}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* 과거 알림 상세보기 오버레이 */}
      <HistoryPastConfirmOverlay
        open={pastConfirm.open}
        route={pastConfirm.route}
        detail={pastConfirm.detail}
        onClose={pastConfirm.close}
      />
    </div>
  );
};

export default HistoryHome;