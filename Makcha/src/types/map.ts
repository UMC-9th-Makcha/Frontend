export interface MapPoint {
  lat: number;
  lng: number;
}

export type PathType =
  // 지하철
  | "SUBWAY_1" | "SUBWAY_2" | "SUBWAY_3" | "SUBWAY_4" | "SUBWAY_5"
  | "SUBWAY_6" | "SUBWAY_7" | "SUBWAY_8" | "SUBWAY_9"
  | "SUBWAY_SUIN"

  | "SUBWAY_91"  // GTX-A
  | "SUBWAY_101" | "SUBWAY_102" | "SUBWAY_104" | "SUBWAY_107" | "SUBWAY_108"
  | "SUBWAY_109" | "SUBWAY_110" | "SUBWAY_112" | "SUBWAY_113"
  | "SUBWAY_114" | "SUBWAY_115" | "SUBWAY_116" | "SUBWAY_117"

  // 버스
  | "BUS_RED" | "BUS_BLUE" | "BUS_GREEN" | "BUS_VILLAGE" | "BUS_GYEONGGI"
  | "BUS_SKY" | "BUS_ORANGE"
  | "BUS" // fallback

  // etc
  | "WALK"
  | "UNKNOWN"; // fallback


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

interface FocusPosition {
  lat: number;
  lng: number;
}

export interface BaseMapProps {
  markers?: MapMarker[];
  activeId?: string | number | null;
  paths?: MapPathSegment[];
  selectedPathId?: string | null;
  onMarkerClick?: (marker: MapMarker) => void;
  onMapClick?: (pos: MapPoint) => void;
  focusPosition?: FocusPosition | null;
}