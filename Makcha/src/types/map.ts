export interface MapPoint {
  lat: number;
  lng: number;
}

export type PathType = 
  | "SUBWAY_1" | "SUBWAY_2" | "SUBWAY_3" | "SUBWAY_4" | "SUBWAY_5" 
  | "SUBWAY_6" | "SUBWAY_7" | "SUBWAY_8" | "SUBWAY_9" | "SUBWAY_SUIN"
  | "BUS_RED" | "BUS_BLUE" | "BUS_GREEN" | "BUS_VILLAGE" | "BUS_GYEONGGI"
  | "WALK";

  export interface OriginSearchItem {
    id: string;
    name: string; 
    position: MapPoint;
    address?: string;
  }

export interface MapPathSegment {
  points: MapPoint[];
  type: PathType;
}