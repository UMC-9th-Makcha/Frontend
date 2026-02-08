import { useQuery } from "@tanstack/react-query";
import { fetchSaveReports } from "../apis/saveReports";
import { useAuthStore } from "../../../store/useAuthStore";

export function useSaveReports(open: boolean, month?: string) {
    const accessToken = useAuthStore((state) => state.accessToken);

    return useQuery({
        queryKey: ["saveReports", month ?? "current"],
        queryFn: () => fetchSaveReports(month),

        enabled: open && !!accessToken, 
        retry: false,
    });
}