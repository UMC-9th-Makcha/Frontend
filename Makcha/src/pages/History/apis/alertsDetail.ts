import { api } from "../../../apis/api";
import type { BaseResponse, AlertDetailResult } from "./types";

export const fetchHistoryAlertDetail = async (notificationId: number) => {
    const res = await api.get<BaseResponse<AlertDetailResult>>(
        `/api/alerts/${notificationId}/detail`
    );
    return res.data.result;
};