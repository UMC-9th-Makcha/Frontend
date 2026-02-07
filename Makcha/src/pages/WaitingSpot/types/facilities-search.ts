import type { Place } from "../../../types/waitingspot";

export type FacilityCategoryKey = "ALL" | "CAFE" | "PC_ROOM" | "RESTAURANT";

export interface WaitingSpotResponse {
    places: PlaceApi[];
    totalCount: number;
};

export interface PlaceApi {
  id: string;
  name: string;
  category?: string;
  location: { lat: number; lng: number };
  address?: string;
  phoneNumber?: string | null;
  distance?: number;
  isOpen24Hours?: boolean;
  source?: string;
  thumbnailUrl: string;
  operatingHours: string;
};

export type useWaitingSpotParams = {
  lat?: number;
  lng?: number;
  category?: string;
  isHydrated: boolean;
  accessToken?: string | null;
};

export interface useFacilitiesSearchParams {
  latitude?: number;
  longitude?: number;
  keyword?: string;
  isHydrated: boolean;
  accessToken?: string | null;
};

export interface useFacilityCategoryParams {
  category: FacilityCategoryKey;
  latitude?: number;
  longitude?: number;
  isHydrated: boolean;
  accessToken?: string | null;
}
export interface GetPlacesParams {
  lat: number;
  lng: number;
  radius?: number;
  category?: string;
  keyword?: string;
}

export interface GetPlaceDetailParams {
  placeId: string;
}

export interface GetSearchParams {
  latitude: number;
  longitude: number;
  radius?: number;
  keyword?: string;
}

export interface GetCategoryParams {
  category: FacilityCategoryKey;
  latitude: number;
  longitude: number;
  radius: number;
};

export interface useWaitingSpotDetailParams {
  placeId?: string | null;
  isHydrated: boolean;
  accessToken?: string | null;
};

export interface FacilitySearchResponse {
  facilities: Place[];
  totalCount?: number;
  searchParams?: {
    latitude: number;
    longitude: number;
    radius: number;
    keyword?: string;
  };
};

export interface FacilityCategoryResponse {
  category: FacilityCategoryKey;
  facilities: Place[];
}