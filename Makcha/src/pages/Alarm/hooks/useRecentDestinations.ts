import { useQuery } from "@tanstack/react-query";
import { fetchRecentDestinations, type RecentDestinationDto } from "../apis/recentDestinations";

export function useRecentDestinations(limit = 10) {
    return useQuery<RecentDestinationDto[], Error>({
        queryKey: ["recent-destinations", limit],
        queryFn: () => fetchRecentDestinations(limit),
        staleTime: 30_000,
        retry: false,
    });
}
