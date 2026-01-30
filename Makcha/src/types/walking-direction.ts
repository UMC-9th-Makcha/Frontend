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

export type DirectionDetailPanelProps = {
  direction: Direction;
  routeDetail: DirectionDetail;
};

export type DirectionStepType =
  | "START"
  | "STRAIGHT"
  | "TURN_LEFT"
  | "TURN_RIGHT"
  | "CROSSWALK"
  | "ARRIVE";

export type DirectionStep = {
  order: number;
  type: DirectionStepType;
  instruction: string;
  distanceMeters?: number;
  durationSeconds?: number;
  point?: {
    lat: number;
    lng: number;
  };
};

export type DirectionDetail = {
  routeId: number | string;
  steps: DirectionStep[];
};

export type DirectionDetailCardProps = {
  step: DirectionStep;
};

