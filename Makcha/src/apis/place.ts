import { api } from "./api";

interface CommonResponse<T = unknown> {
  successCode: string;
  statusCode: number;
  message: string;
  result: T;
}

export interface MyPlaceRequest {
  provider_place_id?: string;
  place_address: string;
  place_detail_address?: string;
  latitude: number;
  longitude: number;
}

export interface MyPlaceResponse {
  myplace_id: string;
  user_id: string;
  place_type: "HOME" | "PLACE";
  provider_place_id: string;
  place_address: string;
  place_detail_address: string;
  latitude: number;
  longitude: number;
}

// 장소 가져오기
export const getMyPlaces = async () => {
  const { data } = await api.get<CommonResponse<{ home: MyPlaceResponse | null; places: MyPlaceResponse[] }>>("/api/myplaces");
  return data.result;
};

// 자주 가는 장소 등록 
export const createFavorite = async (payload: MyPlaceRequest) => {
  await api.post<CommonResponse<MyPlaceResponse>>("/api/myplaces", payload);
};

// 자주 가는 장소 수정
export const updateFavorite = async (myPlaceId: string, payload: Partial<MyPlaceRequest>) => {
  await api.patch<CommonResponse<MyPlaceResponse>>(`/api/myplaces/${myPlaceId}`, payload);
};

// [DELETE] 자주 가는 장소 삭제
export const deleteFavorite = async (myPlaceId: string) => {
  await api.delete<CommonResponse<{ myplace_id: string }>>(`/api/myplaces/${myPlaceId}`);
};

// 홈 수정 
export const upsertHome = async (payload: MyPlaceRequest) => {
  await api.put<CommonResponse<MyPlaceResponse>>("/api/myplaces/home", payload);
};

// 홈 삭제 - 기능만
export const deleteHome = async () => {
  await api.delete<CommonResponse<Record<string, never>>>("/api/myplaces/home");
};