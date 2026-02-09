import { useQuery } from "@tanstack/react-query";
import useToastStore from "../../../store/useToastStore";
import { waitingSpotService } from "../apis/waiting-spot";
import { useEffect } from "react";
import type { useWaitingSpotParams } from "../types/facilities-search";

export function useWaitingSpot({ lat, lng, isHydrated, accessToken, sort}: useWaitingSpotParams) {
  
  const addToast = useToastStore((s) => s.addToast);

  const { data: places, isLoading, isError, refetch: refetchAll } = useQuery({
    queryKey: ["waiting-places", lat, lng, sort],
    queryFn: () =>
      waitingSpotService.getPlaces({
        lat: lat!,
        lng: lng!,
        radius: 1000,
        sort: sort,
      }),
    enabled: !!lat && !!lng && isHydrated && !!accessToken,
    staleTime: 30_000,
    select: (res) =>
      res.places.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        lat: p.location.lat,
        lng: p.location.lng,
        address: p.address,
        phoneNumber: p.phoneNumber,
        distance: p.distance,
        thumbnailUrl: p.thumbnailUrl,
        operatingHours: p.operatingHours,
        isOpen24Hours: p.isOpen24Hours,
        source: p.source,
      })),
  });

  useEffect(() => {
    if (isError) {
      addToast("주변 시설을 불러오지 못했어요.", "error");
    }
  }, [isError]);

  return { places,isError,isLoading,refetchAll};

}