export type WaitingCategoryKey = "all" | "night-cafe" | "pc-cafe" | "sauna";

export type CategoryTabItem<T extends string> = {
  key: T;
  label: string;
}
export type CategoryTabProps<T extends string> = {
  selected: T;
  onChange: (key: T) => void;
  categories: readonly CategoryTabItem<T>[];
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
  title: string;
  content?: string;
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