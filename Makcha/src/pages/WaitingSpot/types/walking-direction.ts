import type { MapMarker, MapPathSegment } from "../../../types/map";
import type { LatLng } from "../../Alarm/mocks/routePathsMock";
import type { Instruction } from "../apis/walking-direction";
import type { Place } from "./waitingspot";

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
  route: {
    distance: number;
    estimatedDuration: number;
    start: LatLng;
    end: LatLng;
    transportType: string;
  };
};

export type DirectionCardProps = {
  route: {
    distance: number;
    estimatedDuration: number;
    start: LatLng;
    end: LatLng;
    transportType: string;
  };
}

export type DirectionSummaryProps = {
  origin: string;
  destination: string;
  value: string;
  onChangeValue: (v: string) => void;
  items: Place[];
  loading: boolean;
  error: boolean;
  onSelect: (place: Place) => void;
}

export type DirectionDetailPanelProps = {
  route: {
    distance: number;
    estimatedDuration: number;
    start: LatLng;
    end: LatLng;
    transportType: string;
  };
  instructions : Instruction[];
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
  instruction: Instruction;
};