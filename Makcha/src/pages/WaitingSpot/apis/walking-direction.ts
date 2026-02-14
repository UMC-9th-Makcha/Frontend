import { api } from "../../../apis/api";
import type { BaseResponse } from "../../../types/api";
import type { DirectionStepType } from "../types/walking-direction";

export interface GetRouteParams {
  startLat : number;
  startLng : number;
  endLat : number;
  endLng : number;
}

export interface Instruction {
  direction: DirectionStepType;
  distance: number;
  duration: number;
  guidance: string;
  roadName: string;
  step: number;
}

export interface Section {
  distance : number;
  duration : number;
} 

export interface LatLng {
  lat : number;
  lng : number;
}

export interface GetRouteResponse {
  navigation: {
    available: boolean;
    instructions: Instruction[];
    sections: Section[];
  };
  route: {
    distance: number;
    estimatedDuration: number;
    start: LatLng;
    end: LatLng;
    transportType: string;
  };
}

export const walkingDirectionService = {
  getRoute: async (params: GetRouteParams): Promise<GetRouteResponse> => {
    const { data } = await api.post<BaseResponse<GetRouteResponse>>( '/api/route/walking', params )
    return data.result
  }
}