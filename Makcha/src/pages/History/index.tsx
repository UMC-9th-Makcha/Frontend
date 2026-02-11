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

  const [confirmDetail, setConfirmDetail] = useState<RouteConfirmDetail | null>(null);
  const [confirmRoute, setConfirmRoute] = useState<AlarmRoute | null>(null);

  const openConfirm = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsConfirmOpen(true);

    if (USE_MOCK) {
      const d = ROUTE_CONFIRM_DETAIL_MOCK[item.routeId];
      if (!d) {
        alert("상세 데이터 없음");
        setIsConfirmOpen(false);
        return;
      }

      const totalDurationMin = d.segments.reduce((sum, s) => sum + s.durationMin, 0);

      setConfirmDetail(d);
      setConfirmRoute({
        id: item.routeId,
        cacheKey: "",
        routeToken: "",
        isOptimal: true,
        routeType: "SUBWAY",
        lines: [],
        departureTime: item.departAt,
        minutesLeft: 0,
        timeUntilDeparture: "",
        totalDurationMin,
        transferCount: 0,
        walkingTimeMin: 0,
        segments: d.segments,
      });
      return;
    }

    try {
      const data = await fetchHistoryAlertDetail(Number(item.id));
      const segments = stepsToSegments(data.steps ?? []);

      setConfirmDetail({
        etaText: data.arrival_at ? `${toHHMM(data.arrival_at)} 도착` : "도착 정보 없음",
        segments,
      });

      setConfirmRoute({
        id: `history-past-${item.id}`,
        cacheKey: data.route_token ?? "",
        routeToken: data.route_token ?? "",
        isOptimal: Boolean(data.is_optimal),
        routeType: "BUS",
        lines: data.lines ?? [],
        departureTime: data.departure_at ? toHHMM(data.departure_at) : item.departAt,
        minutesLeft: data.minutes_left ?? 0,
        timeUntilDeparture: toUntilText(data.minutes_left ?? 0),
        totalDurationMin: data.total_duration_min ?? 0,
        transferCount: data.transfer_count ?? 0,
        walkingTimeMin: data.walking_time_min ?? 0,
        segments,
      });
    } catch (e) {
      console.error("[history:detail] failed", e);
      alert("상세 조회 실패");
      setIsConfirmOpen(false);
      setConfirmDetail(null);
      setConfirmRoute(null);
    }
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setConfirmDetail(null);
    setConfirmRoute(null);
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

          <Panel width="md:w-100" disablePadding className="shadow-2xl relative z-10">
            <RouteConfirmPanel
              route={confirmRoute}
              detail={confirmDetail}
              onBack={closeConfirm}
              onConfirm={closeConfirm}
              mode="historyPast"
            />
          </Panel>

          <section className="hidden md:block min-w-0 flex-1 h-dvh relative z-10">
            <KakaoMapView
              routes={confirmRoute ? [confirmRoute] : []}
              selectedRouteId={confirmRoute?.id ?? null}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default HistoryHome;