export interface MapPoint {
  lat: number;
  lng: number;
}

export type PathType = 
  | "SUBWAY_1" | "SUBWAY_2" | "SUBWAY_3" | "SUBWAY_4" | "SUBWAY_5" 
  | "SUBWAY_6" | "SUBWAY_7" | "SUBWAY_8" | "SUBWAY_9" | "SUBWAY_SUIN"
  | "BUS_RED" | "BUS_BLUE" | "BUS_GREEN" | "BUS_VILLAGE" | "BUS_GYEONGGI"
  | "WALK";

// 마커의 성격
export type MarkerVariant = 'start' | 'end' | 'spot' | 'current' | 'select';

export interface MapMarker {
  id: string | number;
  name: string;
  position: MapPoint;
  variant: MarkerVariant;
  address?: string;
}

export interface MapPathSegment {
  id: string;
  points: MapPoint[];
  type: PathType;
}