import { api } from '../../../apis/api';
import type { BaseResponse } from '../../../types/api';
import type { PlaceDetail } from '../types/waitingspot';
import type { FacilitySearchResponse, GetPlaceDetailParams, GetPlacesParams, GetSearchParams, WaitingSpotResponse } from '../types/api';

export const waitingSpotService = {
  getPlaces: async (params: GetPlacesParams): Promise<WaitingSpotResponse> => {
    const { data } = await api.get<BaseResponse<WaitingSpotResponse>>(
      '/api/waiting-places',
      { params }
    );
    return data.result;
  },

  getPlaceDetail: async (params: GetPlaceDetailParams): Promise<PlaceDetail> => {
    const { placeId, lat, lng } = params;
    const { data } = await api.get(`/api/waiting-places/${placeId}`, {
      params: { lat, lng },
    });
    return data.result;
  },

};

export const facilitySearchService = {
  getSearch: async (params: GetSearchParams): Promise<FacilitySearchResponse> => {
    const { data } = await api.get<BaseResponse<FacilitySearchResponse>>(
      '/api/facilities/search',
      { params }
    );
    return data.result;
  }
}


