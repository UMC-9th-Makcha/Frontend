import { useQuery } from "@tanstack/react-query";
import useToastStore from "../../../store/useToastStore";
import { waitingSpotService } from "../apis/waiting-spot";
import { useEffect } from "react";
import type { useWaitingSpotDetailParams } from "../types/api";

export function useWaitingSpotDetail({ placeId, lat, lng, isHydrated, accessToken}: useWaitingSpotDetailParams) {
  
  const addToast = useToastStore((s) => s.addToast);

  const { data: placeDetail, isLoading: DetailLoading, isError: DetailError, refetch: refetchDetail } = useQuery({
    queryKey: ["waiting-place-detail", placeId, lat, lng ],
    queryFn: () =>
      waitingSpotService.getPlaceDetail({ 
        lat: lat!,
        lng: lng!,
        placeId: placeId! 
      }),
    enabled: !!lat && !!lng && placeId != null && isHydrated && !!accessToken,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (DetailError) {
      addToast("상세 정보를 불러오지 못했어요.", "error");
    }
  }, [DetailError]);

  return { placeDetail,DetailLoading,DetailError,refetchDetail};

}