import { api } from "../../../apis/api";
import type { ApiResponse, AlertsHistoryDto } from "../types/history";

export async function fetchAlertsHistory(): Promise<AlertsHistoryDto> {
    const { data } = await api.get<ApiResponse<AlertsHistoryDto>>("/api/alerts/history");
    return data.result;
}