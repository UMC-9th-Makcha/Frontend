import type { MapMarker, MapPathSegment } from "./map";

export type RouteCategoryKey = "shortest" | "safe" | "bright";

export type Direction = {
  id: number;
  origin: {
    lat: number;
    lng: number;
    name: string;
  };
  destination: {
    id: number;
    lat: number;
    lng: number;
    name: string;
  };
  summary: {
    category: string;
    durationSeconds: number;
    distanceMeters: number;
    crosswalkCount: number;
  };
  markers: MapMarker[];
  paths: MapPathSegment[];
};

export type DirectionListProps = {
  direction: Direction;
};

export type DirectionCardProps = {
  summary: {
    category: string;
    durationSeconds: number;
    distanceMeters: number;
    crosswalkCount: number;
  };
}

export type DirectionSummaryProps = {
  origin: string;
  destination: string;
  onSubmitOrigin?: (value: string) => void;
}

export type RouteDetailPanelProps = {
  direction: Direction;
};
