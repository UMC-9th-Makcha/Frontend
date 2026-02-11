import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { AlarmRoute } from "../types/alarm";
import type { RouteConfirmDetail } from "../types/routeConfirm";
import { stepsToSegments } from "../utils/mapper";
import { formatHHMM, formatMinutesLeftText, formatEtaText } from "../utils/format";
import { fetchAlertDetail } from "../apis/alerts";
import type { Step } from "./useAlarmFlow";

type NavState = {
    from?: "history";
    openConfirm?: boolean;
    routeId?: string;
    notificationId?: number;
};

export function useHistoryConfirm(params: {
    navState: NavState | null;
    setStep: (s: Step) => void;
    setRoutes: (r: AlarmRoute[]) => void;
    setSelectedRoute: (r: AlarmRoute | null) => void;
    setHistoryConfirm: (v: { notificationId: number; detail: RouteConfirmDetail } | null) => void;
    cameFromHistoryRef: React.MutableRefObject<boolean>;
}) {
    const navigate = useNavigate();

    useEffect(() => {
        const open = params.navState?.openConfirm;
        const notificationId = params.navState?.notificationId;
        if (!open || !notificationId) return;

        params.cameFromHistoryRef.current = params.navState?.from === "history";

        (async () => {
            try {
                params.setStep("LOADING");

                const data = await fetchAlertDetail(notificationId);
                const segments = stepsToSegments(data.steps ?? []);

                const route: AlarmRoute = {
                    id: `history-${notificationId}`,
                    cacheKey: data.route_token ?? "",
                    routeToken: data.route_token ?? "",
                    isOptimal: Boolean(data.is_optimal),

                    routeType: "BUS",
                    lines: data.lines ?? [],

                    minutesLeft: data.minutes_left ?? 0,
                    timeUntilDeparture: formatMinutesLeftText(data.minutes_left ?? 0),
                    departureTime: formatHHMM(data.departure_at),
                    totalDurationMin: data.total_duration_min ?? 0,
                    transferCount: data.transfer_count ?? 0,
                    walkingTimeMin: data.walking_time_min ?? 0,
                    segments,
                };

                params.setRoutes([route]);
                params.setSelectedRoute(route);

                params.setHistoryConfirm({
                    notificationId,
                    detail: {
                        etaText: formatEtaText(data.arrival_at ?? data.departure_at),
                        segments,
                    },
                });

                params.setStep("CONFIRM");
            } catch (e) {
                console.error("[history confirm] failed", e);
                params.setStep("INPUT");
                alert("알림 상세 조회 실패");
            } finally {
                navigate(".", { replace: true, state: null });
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.navState?.openConfirm, params.navState?.notificationId]);
}
