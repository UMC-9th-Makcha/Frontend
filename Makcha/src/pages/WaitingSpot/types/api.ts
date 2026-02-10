import type { Place, WaitingCategoryKey } from "./waitingspot";

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
  sort?: string;
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

export interface GetPlacesParams {
  lat: number;
  lng: number;
  radius?: number;
  sort?: string;
  category?: string;
  keyword?: string;
}

export interface GetPlaceDetailParams {
  placeId: string;
  lat: number;
  lng: number;
}

export interface GetSearchParams {
  latitude: number;
  longitude: number;
  radius?: number;
  keyword?: string;
}

export interface useWaitingSpotDetailParams {
  placeId?: string | null;
  lat?: number;
  lng?: number;
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
  category: WaitingCategoryKey;
  facilities: Place[];
}