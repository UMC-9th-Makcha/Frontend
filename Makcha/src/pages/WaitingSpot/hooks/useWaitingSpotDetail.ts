import { useQuery } from "@tanstack/react-query";
import useToastStore from "../../../store/useToastStore";
import { waitingSpotService } from "../apis/waiting-spot";
import { useEffect } from "react";
import type { useWaitingSpotDetailParams } from "../types/facilities-search";

export function useWaitingSpotDetail({ placeId, isHydrated, accessToken}: useWaitingSpotDetailParams) {
  
  const addToast = useToastStore((s) => s.addToast);

  const { data: placeDetail, isLoading: DetailLoading, isError: DetailError, refetch: refetchDetail } = useQuery({
    queryKey: ["waiting-place-detail", placeId ],
    queryFn: () =>
      waitingSpotService.getPlaceDetail({ placeId: placeId! }),
    enabled: placeId != null && isHydrated && !!accessToken,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (DetailError) {
      addToast("상세 정보를 불러오지 못했어요.", "error");
    }
  }, [DetailError]);

  return { placeDetail,DetailLoading,DetailError,refetchDetail};

}