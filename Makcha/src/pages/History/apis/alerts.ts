import { api } from "../../../apis/api";
import type { ApiResponse } from "../types/history";

export async function cancelAlert(notificationId: number): Promise<void> {
    await api.patch<ApiResponse<unknown>>(`/api/alerts/${notificationId}/cancel`);
}

export async function forceCompleteAlert(notificationId: number): Promise<void> {
    await api.post<ApiResponse<unknown>>(`/api/alerts/${notificationId}/force-complete`);
}