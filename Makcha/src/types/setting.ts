import type { ReactNode } from "react";
import type { ViewType } from "../pages/Setting/constants";

export interface Place {
    id: string;
    name: string;
    address: string;
    detail: string;
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
}

export interface SettingPanelProps {
  view: ViewType;
  data: { home: Place; favorites: Place[] }; 
  onNavigate: (view: ViewType, place?: Place) => void;
}

export interface SettingAccountProps {
  onNavigate: (view: ViewType) => void;
}

export interface SettingPlacesProps {
  onNavigate: (view: ViewType, place?: Place) => void;
}