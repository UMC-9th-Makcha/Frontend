import type { ReactNode } from "react";
import type { ViewType } from "../constants";

export interface Place {
  id: string;
  provider_place_id?: string;
  place_address: string;
  place_detail_address?: string;
  latitude: number;
  longitude: number;
}

export interface PlaceListItemProps {
  icon: ReactNode;
  place: Place;
  onClick: () => void;
}

export interface PlaceSettingProps {
  place: Place;
  onBack: () => void;
  onSave: (updated: Place) => void;
  onDelete?: (id: string) => void;
}

export interface PhonenumberSettingProps {
  onBack: () => void;
  onComplete: (payload?: { phone: string }) => void;
}

export interface AccountSectionProps {
  onNavigate: (view: ViewType) => void;
}

export interface SettingPlaceProps {
  onNavigate: (v: ViewType, p?: Place) => void;
}

export interface SettingPanelProps {
  view: ViewType;
  onNavigate: (v: ViewType, p?: Place) => void;
}