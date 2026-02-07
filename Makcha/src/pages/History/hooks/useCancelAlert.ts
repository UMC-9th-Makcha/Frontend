import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAlert } from "../apis/alerts";

export function useCancelAlert() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (notificationId: number) => cancelAlert(notificationId),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ["alertsHistory"] });
        },
    });
}
