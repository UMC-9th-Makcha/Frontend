import { useQuery } from "@tanstack/react-query";
import { facilitySearchService } from "../apis/waiting-spot";
import type { FacilityCategoryResponse, useFacilityCategoryParams } from "../types/facilities-search";

export function useFacilitiesCategory({ category, latitude, longitude, isHydrated, accessToken}: useFacilityCategoryParams) {

  const { data: categoryData, isLoading: categoryLoading, isError: categoryError, refetch: refetchCategory } = useQuery<FacilityCategoryResponse>({
    queryKey: ["facility-category", category, latitude, longitude],
    queryFn: () =>
      facilitySearchService.getCategory({
        category: category,
        latitude: latitude!,
        longitude: longitude!,
        radius: 1000,
      }),
    enabled: category !== "ALL" && !!latitude && !!longitude && isHydrated && !!accessToken,
    staleTime: 30_000,
  });

  return { categoryData, categoryLoading, categoryError, refetchCategory  };

}