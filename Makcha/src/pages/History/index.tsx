import { useState } from "react";
import CurrentAlarmCard from "./components/CurrentAlarmCard";
import PastSummaryCard from "./components/PastSummaryCard";
import MonthSection from "./components/MonthSection";
import SaveReportPanel from "./components/SaveReportPanel";
import { CURRENT_ALARM_MOCK, PAST_SUMMARY_MOCK, MONTH_SECTIONS_MOCK } from "./mocks/historyMock";

const HistoryHome = () => {
  const [isSaveReportOpen, setIsSaveReportOpen] = useState(false);
  const reportItems = MONTH_SECTIONS_MOCK[0]?.items ?? [];
  const totalSavedAmount = PAST_SUMMARY_MOCK.thisMonthTaxiCost;

  return (
    <div className="relative h-full w-full p-5 pt-13 md:pt-24">
      <SaveReportPanel
        open={isSaveReportOpen}
        onClose={() => setIsSaveReportOpen(false)}
        totalSavedAmount={totalSavedAmount}
        items={reportItems}
      />

      {/* 구분선: PC에서만 */}
      <div className="pointer-events-none absolute top-10 bottom-10 left-1/2 translate-x-[20px] hidden w-px bg-[#E2E2E2] dark:bg-makcha-navy-800 md:block" />

      {/* 본문 */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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
              summary={PAST_SUMMARY_MOCK}
              onDetail={() => setIsSaveReportOpen(true)}
            />
          </div>

          <div className="mt-9 space-y-10">
            {MONTH_SECTIONS_MOCK.map((sec) => (
              <MonthSection
                key={sec.monthLabel}
                monthLabel={sec.monthLabel}
                items={sec.items}
                onDetail={() => setIsSaveReportOpen(true)} 
              />
            ))}
          </div>

        </section>
      </div>
    </div>
  );
};

export default HistoryHome;
