import { useQuery } from "@tanstack/react-query";
import { fetchSaveReports } from "../apis/saveReports";

export function useSaveReports(open: boolean, month?: string) {
    return useQuery({
        queryKey: ["saveReports", month ?? "current"],
        queryFn: () => fetchSaveReports(month),
        enabled: open,    // 패널 열렸을 때만 호출
        retry: false,
    });
}