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