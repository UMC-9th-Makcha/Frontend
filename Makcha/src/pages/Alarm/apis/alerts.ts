import { api } from "../../../apis/api";

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
