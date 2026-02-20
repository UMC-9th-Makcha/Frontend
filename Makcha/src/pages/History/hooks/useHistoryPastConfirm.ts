import { useState } from "react";
import type { HistoryItem } from "../types/history";
import type { RouteConfirmDetail } from "../../Alarm/types/routeConfirm";
import type { AlarmRoute } from "../../Alarm/types/alarm";
import { stepsToSegments } from "../../Alarm/utils/mapper";
import { ROUTE_CONFIRM_DETAIL_MOCK } from "../../Alarm/mocks/routeConfirmMock";
import { fetchHistoryAlertDetail } from "../apis/alertsDetail";
import { toHHMM, toUntilText } from "../utils/date";

type Params = {
    USE_MOCK: boolean;
};

export function useHistoryPastConfirm({ USE_MOCK }: Params) {
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState<RouteConfirmDetail | null>(null);
    const [route, setRoute] = useState<AlarmRoute | null>(null);

    const close = () => {
        setOpen(false);
        setDetail(null);
        setRoute(null);
    };

    const openConfirm = async (item: HistoryItem) => {
        setOpen(true);

        // 1) MOCK
        if (USE_MOCK) {
            const d = ROUTE_CONFIRM_DETAIL_MOCK[item.routeId];
            if (!d) {
                alert("상세 데이터 없음");
                close();
                return;
            }

            const totalDurationMin = d.segments.reduce((sum, s) => sum + s.durationMin, 0);

            setDetail(d);
            setRoute({
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

        // 2) notificationId 없음
        if (!item.notificationId) {
            alert(
                "이전 과거 알림은 상세 경로 데이터가 없어 조회할 수 없어요. 새로 생성한 알림을 강제 완료한 뒤 조회해 주세요."
            );
            close();
            return;
        }

        // 3) API 조회 + 매핑
        try {
            const data = await fetchHistoryAlertDetail(Number(item.notificationId));
            const segments = stepsToSegments(data.steps ?? []);

            setDetail({
                etaText: data.arrival_at ? `${toHHMM(data.arrival_at)} 도착` : "도착 정보 없음",
                segments,
            });

            setRoute({
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
            close();
        }
    };

    return {
        open,
        detail,
        route,
        openConfirm,
        close,
    };
}
