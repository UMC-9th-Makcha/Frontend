import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../apis/api";

type ApiResponse<T> = {
    successCode: string;
    statusCode: number;
    message: string;
    result: T;
};

async function cancelAlert(notificationId: number): Promise<void> {
    await api.patch<ApiResponse<unknown>>(`/api/alerts/${notificationId}/cancel`);
}

export function useCancelAlert() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (notificationId: number) => cancelAlert(notificationId),
        onSuccess: async () => {
            // history 화면 데이터 새로고침
            await qc.invalidateQueries({ queryKey: ["alertsHistory"] });
        },
    });
}
