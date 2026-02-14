import { useQuery } from "@tanstack/react-query";
import { fetchAlertsHistory } from "../apis/alertsHistory";

export function useAlertsHistory() {
    return useQuery({
        queryKey: ["alertsHistory"],
        queryFn: fetchAlertsHistory,
        enabled: true,     // 페이지 진입 시 바로 호출
        retry: false,
    });
}