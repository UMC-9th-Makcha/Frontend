import { api } from "../../../apis/api";
import type { ApiResponse } from "../types/history";

export async function cancelAlert(notificationId: number): Promise<void> {
    await api.patch<ApiResponse<unknown>>(`/api/alerts/${notificationId}/cancel`);
}
