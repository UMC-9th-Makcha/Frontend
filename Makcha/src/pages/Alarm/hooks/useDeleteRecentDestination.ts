import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecentDestination } from "../apis/recentDestinations";

export function useDeleteRecentDestination() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (recentId: string) => deleteRecentDestination(recentId),
        onSuccess: async () => {
            // 삭제 후 목록 새로고침
            await qc.invalidateQueries({ queryKey: ["recent-destinations"] });
        },
    });
}