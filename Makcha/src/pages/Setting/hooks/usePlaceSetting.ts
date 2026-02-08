import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as placeApi from '../../../apis/place';
import { useAuthStore } from '../../../store/useAuthStore';
import type { Place } from '../types/setting';
import { SETTING_KEYS } from '../constants';

const mapResponseToPlace = (res: placeApi.MyPlaceResponse, isHome: boolean): Place => ({
  id: isHome ? 'home' : res.myplace_id,
  provider_place_id: res.provider_place_id,
  place_address: res.place_address,
  place_detail_address: res.place_detail_address,
  latitude: res.latitude,
  longitude: res.longitude,
});

export const usePlaceSetting = () => {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);

  const { data, isLoading } = useQuery({
    queryKey: SETTING_KEYS.place,
    queryFn: async () => {
      const { home, places } = await placeApi.getMyPlaces();
      return {
        home: home ? mapResponseToPlace(home, true) : null,
        favorites: places.map((p) => mapResponseToPlace(p, false)),
      };
    },
    enabled: !!accessToken,
    retry: false, 
  });

  const saveMutation = useMutation({
    mutationFn: async (updated: Place) => {
      const payload: placeApi.MyPlaceRequest = {
        provider_place_id: updated.provider_place_id,
        place_address: updated.place_address,
        place_detail_address: updated.place_detail_address,
        latitude: updated.latitude || 0,
        longitude: updated.longitude || 0,
      };

      if (updated.id === 'home') {
        return await placeApi.upsertHome(payload);
      } else {
        const isNew = updated.id.length >= 10; 
        if (isNew) {
          return await placeApi.createFavorite(payload);
        } else {
          return await placeApi.updateFavorite(updated.id, payload);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTING_KEYS.place });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (id === 'home') {
        return await placeApi.deleteHome();
      } else {
        if (id.length >= 10) return; 
        return await placeApi.deleteFavorite(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTING_KEYS.place });
    },
  });

  return {
    home: data?.home ?? null,
    favorites: data?.favorites ?? [],
    isLoading,
    savePlace: saveMutation.mutate,
    deletePlace: deleteMutation.mutate,
    isSaving: saveMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};