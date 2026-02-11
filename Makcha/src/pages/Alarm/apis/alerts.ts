import { api } from "../../../apis/api";
import type { CandidateStep } from "../types/candidate";

type BaseResponse<T> = {
    successCode: string;
    statusCode: number;
    message: string;
    result: T;
};

export type CreateAlertBody = {
    cacheKey: string;
    alert_time?: number;
};

export type CreateAlertResult = {
    alertId: string;
};

export async function createAlert(body: CreateAlertBody) {
    const res = await api.post<BaseResponse<CreateAlertResult>>("/api/alerts", body);
    return res.data.result;
}

export type AlertDetailResult = {
    notification_id: number;

    is_optimal: boolean;
    lines: string[];
    total_duration_min: number;
    transfer_count: number;
    walking_time_min: number;
    minutes_left: number;

    departure_at?: string;
    arrival_at?: string;

    steps: CandidateStep[];
};

export async function fetchAlertDetail(notificationId: number) {
    const res = await api.get<BaseResponse<AlertDetailResult>>(
        `/api/alerts/${notificationId}/detail`
    );
    return res.data.result;
}

export async function deleteAlert(notificationId: number) {
    await api.delete(`/api/alerts/${notificationId}`);
}