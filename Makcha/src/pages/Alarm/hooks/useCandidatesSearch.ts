import type { OriginSearchItem } from "../types/search";
import type { AlarmRoute } from "../types/alarm";
import type { Candidate } from "../types/candidate";
import { toCandidatesPointBody, fetchCandidates } from "../apis/routes";
import { candidatesToRoutes } from "../utils/mapper";
import type { Step } from "./useAlarmFlow";
import type { RouteConfirmDetail } from "../types/routeConfirm";

export function useCandidatesSearch(params: {
    setStep: (s: Step) => void;
    setCandidatesRaw: (c: Candidate[]) => void;
    setRoutes: (r: AlarmRoute[]) => void;
    setSelectedRoute: (r: AlarmRoute | null) => void;
    setHistoryConfirm: (v: { notificationId: number; detail: RouteConfirmDetail } | null) => void;
    cameFromHistoryRef: React.MutableRefObject<boolean>;
}) {
    const startRouteSearch = async (o: OriginSearchItem, d: OriginSearchItem) => {
        params.setStep("LOADING");

        const minDelay: Promise<void> = new Promise((resolve) => setTimeout(resolve, 300));

        try {
            const [candidates] = await Promise.all([
                fetchCandidates({
                    origin: toCandidatesPointBody(o),
                    destination: toCandidatesPointBody(d),
                }),
                minDelay,
            ]);

            params.setCandidatesRaw(candidates);
            params.setRoutes(candidatesToRoutes(candidates));
            params.setSelectedRoute(null);
            params.setHistoryConfirm(null);
            params.cameFromHistoryRef.current = false;

            params.setStep("RESULT");
        } catch (e) {
            console.error("[routes:candidates] failed", e);
            params.setCandidatesRaw([]);
            params.setRoutes([]);
            params.setSelectedRoute(null);
            params.setStep("RESULT");
        }
    };

    return { startRouteSearch };
}
