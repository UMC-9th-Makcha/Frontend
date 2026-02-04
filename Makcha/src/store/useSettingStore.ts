import { create } from 'zustand';
import * as placeApi from '../apis/place';
import type { Place } from '../pages/Setting/types/setting';
import type { ViewType } from '../pages/Setting/constants';

interface SettingState {
  home: Place | null;
  favorites: Place[];
  isLoading: boolean;
  view: ViewType;

  fetchPlaces: () => Promise<void>;
  savePlace: (updated: Place) => Promise<void>;
  deletePlace: (id: string) => Promise<void>;
  setView: (view: ViewType) => void;
}

// Backend DTO -> Frontend Model 변환
const mapResponseToPlace = (res: placeApi.MyPlaceResponse, isHome: boolean): Place => ({
  id: isHome ? 'home' : res.myplace_id,
  provider_place_id: res.provider_place_id,
  place_address: res.place_address,
  place_detail_address: res.place_detail_address,
  latitude: res.latitude,
  longitude: res.longitude,
});

export const useSettingStore = create<SettingState>((set, get) => ({
  home: null,
  favorites: [],
  isLoading: false,
  view: 'MAIN',


  // 조회
  fetchPlaces: async () => {
    set({ isLoading: true });
    try {
      const { home, places } = await placeApi.getMyPlaces();
      set({
        home: home ? mapResponseToPlace(home, true) : null,
        favorites: places.map((p) => mapResponseToPlace(p, false)),
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // 통합 저장
  savePlace: async (updated: Place) => {
    const payload: placeApi.MyPlaceRequest = {
      provider_place_id: updated.provider_place_id,
      place_address: updated.place_address,
      place_detail_address: updated.place_detail_address,
      latitude: updated.latitude || 0,
      longitude: updated.longitude || 0,
    };

    if (updated.id === 'home') {
      await placeApi.upsertHome(payload);
    } else {
      const isNew = updated.id.length >= 10; 
      
      if (isNew) {
        await placeApi.createFavorite(payload);
      } else {
        await placeApi.updateFavorite(updated.id, payload);
      }
    }

    await get().fetchPlaces();
  },

  // 통합 삭제
  deletePlace: async (id: string) => {
    if (id === 'home') {
      await placeApi.deleteHome();
      set({ home: null }); 
    } else {
      if (id.length >= 10) return;

      await placeApi.deleteFavorite(id);
      await get().fetchPlaces();
    }
  },

  setView: (view) => set({ view }),
}));