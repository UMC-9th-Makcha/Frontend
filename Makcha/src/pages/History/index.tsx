import { useState } from "react";
import CurrentAlarmCard from "./components/CurrentAlarmCard";
import PastSummaryCard from "./components/PastSummaryCard";
import MonthSection from "./components/MonthSection";
import SaveReportPanel from "./components/SaveReportPanel";

import {
  CURRENT_ALARM_MOCK,
  PAST_SUMMARY_MOCK,
  MONTH_SECTIONS_MOCK,
} from "./mocks/historyMock";

const HistoryHome = () => {
  const [isSaveReportOpen, setIsSaveReportOpen] = useState(false);
  const reportItems = MONTH_SECTIONS_MOCK[0]?.items ?? [];
  const totalSavedAmount = PAST_SUMMARY_MOCK.thisMonthTaxiCost;

  return (
    <div className="relative h-full w-full">
      <SaveReportPanel
        open={isSaveReportOpen}
        onClose={() => setIsSaveReportOpen(false)}
        totalSavedAmount={totalSavedAmount}
        items={reportItems}
      />

      {/* 우측 상단 */}
      <div className="mb-6 flex items-center justify-end gap-4">
        <span className="font-pretendard font-normal text-[20px] text-[#5F5F5F] dark:text-gray-400">
          이미 한번 이용해보셨나요?
        </span>
        <div className="h-15 w-15 rounded-full bg-gray-200" />
      </div>
      
      {/* 구분선 */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-[calc(50%+20px)] w-px bg-[#E2E2E2] dark:bg-makcha-navy-800" />

      {/* 본문 */}
      <div className="grid grid-cols-2 gap-10">
        {/* 왼쪽 */}
        <section className="min-w-0">
          <h1 className="text-[32px] font-medium text-black dark:text-white">알림 내역</h1>
          <p className="mt-2.5 text-[20px] text-[#5F5F5F] dark:text-gray-400">
            현재 신청한 알림을 확인할 수 있어요
          </p>

          <div className="mt-7">
            <CurrentAlarmCard alarm={CURRENT_ALARM_MOCK} />
          </div>
        </section>

        {/* 오른쪽 */}
        <section className="min-w-0 pl-10">
          <h1 className="text-[32px] font-medium text-black dark:text-white">과거 알림 내역</h1>

          <div className="mt-7">
            <PastSummaryCard
              summary={PAST_SUMMARY_MOCK}
              onDetail={() => setIsSaveReportOpen(true)}
            />
          </div>

          <div className="mt-9.25">
            {MONTH_SECTIONS_MOCK.map((sec) => (
              <MonthSection
                key={sec.monthLabel}
                monthLabel={sec.monthLabel}
                items={sec.items}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HistoryHome;