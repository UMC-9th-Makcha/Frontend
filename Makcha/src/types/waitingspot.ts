export type CategoryKey = "all" | "night-cafe" | "pc-cafe" | "sauna";

export type CategoryTabProps = {
  selected: CategoryKey;
  onChange: (key: CategoryKey) => void;
};

export type WaitingSpotLayoutProps = {
  header: React.ReactNode;
  controls: React.ReactNode;
  map: React.ReactNode;
  search: React.ReactNode;
  list: React.ReactNode;
  detail?: React.ReactNode;
}

export type WaitingSpotHeaderProps = {
  title: string
}

export type Place = {
  id: number;
  name: string;
  category: string;
  address: string;
  distanceMeter: number;
  durationSeconds: number;
  badge: string;
};

export type PlaceListProps = {
  places: Place[];
  selectedPlaceId: number | null;
  onSelectPlaceId: (id: number) => void;
};

export type PlaceCardProps = {
  place: Place;
  isSelected?: boolean;
  onSelect: () => void;
};

export type SortValue = "distance" | "open24h";

export type SortToggleProps = {
  value: SortValue;
  onChange: (value: "distance" | "open24h") => void;
};

export type PlaceDetailProps = {
  place : Place | null;
  onClose: () => void;
}

export type PlaceDetail = {
  id: number;
  subcategory: string;
  imageUrl: string;
  accessInfo: string;
  phone: string | null;
  badge: string[];
};