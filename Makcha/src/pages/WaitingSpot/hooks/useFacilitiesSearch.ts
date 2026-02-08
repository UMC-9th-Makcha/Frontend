import { useQuery } from "@tanstack/react-query";
import { facilitySearchService } from "../apis/waiting-spot";
import type { FacilitySearchResponse, useFacilitiesSearchParams } from "../types/facilities-search";

export function useFacilitiesSearch({ latitude, longitude, isHydrated, accessToken, keyword}: useFacilitiesSearchParams) {

  const { data: facilities, isLoading: facilitiesLoading, isError: facilitiesError } = useQuery<FacilitySearchResponse>({
    queryKey: ["facility-search", latitude, longitude, keyword],
    queryFn: () =>
      facilitySearchService.getSearch({
        latitude: latitude!,
        longitude: longitude!,
        radius: 10000,
        keyword: keyword,
      }),
    enabled: !!latitude && !!longitude && isHydrated && !!accessToken,
    staleTime: 30_000,
  });

  return { facilities, facilitiesLoading, facilitiesError };

}