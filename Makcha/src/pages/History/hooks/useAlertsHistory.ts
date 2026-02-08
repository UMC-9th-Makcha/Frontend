import { useQuery } from "@tanstack/react-query";
import { fetchAlertsHistory } from "../apis/alertsHistory";

export function useAlertsHistory() {
    return useQuery({
        queryKey: ["alertsHistory"],
        queryFn: fetchAlertsHistory,
        retry: false,
    });
}
