import { useQuery } from "@tanstack/react-query";
import { walkingDirectionService } from "../apis/walking-direction";

export interface useWalkingRouteParams {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  isHydrated: boolean;
  accessToken?: string | null;
}

export function useWalkingRoute({ startLat, startLng, endLat, endLng, isHydrated, accessToken }: useWalkingRouteParams) {

  const { data: routeData, isLoading: routeLoading, isError: routeError, refetch: routeRefetch } = useQuery({
    queryKey: ['route-walking', startLat, startLng, endLat, endLng],
    queryFn: () =>
      walkingDirectionService.getRoute({
        startLat: startLat,
        startLng: startLng,
        endLat: endLat,
        endLng: endLng,
      }),
    enabled: !!startLat && !!startLng && !!endLat && !!endLng && isHydrated && !!accessToken,
    staleTime: 30_000,
  });

  return { routeData, routeLoading, routeError, routeRefetch }
}