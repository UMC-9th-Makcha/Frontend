import { useMemo, useState } from "react";
import Panel from "../../components/common/Panel";
import CurrentAlarmCard from "./components/CurrentAlarmCard";
import PastSummaryCard from "./components/PastSummaryCard";
import MonthSection from "./components/MonthSection";
import SaveReportPanel from "./components/SaveReportPanel";
import { ROUTE_CONFIRM_DETAIL_MOCK } from "../Alarm/mocks/routeConfirmMock";
import RouteConfirmPanel from "../Alarm/panels/RouteConfirmPanel";
import type { AlarmRoute } from "../Alarm/types/alarm";
import type { HistoryItem } from "./types/history";
import { useNavigate } from "react-router-dom";
import { useHistoryHomeViewModel } from "./hooks/useHistoryViewModel";

const HistoryHome = () => {
  const navigate = useNavigate();

  const {
    saveReportPanelProps,
    finalCurrentAlarm,
    finalPastSummary,
    finalMonthSections,
  } = useHistoryHomeViewModel();

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
      <SaveReportPanel {...saveReportPanelProps} />

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
                onDetail={saveReportPanelProps.onDetail}
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