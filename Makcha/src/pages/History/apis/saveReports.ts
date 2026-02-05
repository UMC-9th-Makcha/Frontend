import { api } from "../../../apis/api";
import type { ApiResponse, SaveReportsResult } from "../types/saveReport";

export async function fetchSaveReports(month?: string): Promise<SaveReportsResult> {
    const { data } = await api.get<ApiResponse<SaveReportsResult>>("/api/save-reports", {
        params: month ? { month } : undefined,
    });
    return data.result;
}