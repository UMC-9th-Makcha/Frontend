import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forceCompleteAlert } from "../apis/alerts";

export function useForceCompleteAlert() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (notificationId: number) =>
            forceCompleteAlert(notificationId),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: ["alertsHistory"] });
            await qc.invalidateQueries({ queryKey: ["recentDestinations"] });
        },
    });
}