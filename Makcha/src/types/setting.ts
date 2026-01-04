import type { ReactNode } from "react";

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