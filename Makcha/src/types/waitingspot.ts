export type WaitingCategoryKey = "ALL" | "CAFE" | "PC_ROOM" | "RESTAURANT";

export type Origin = { id: string; name: string; lat: number; lng: number } | null;

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
  footer?: React.ReactNode;
  onDetailBack: () => void;
}

export type WaitingSpotHeaderProps = {
  title: string;
  content?: string;
}

export type Place = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address?: string;
  category?: string;
  distance?: number;
  phoneNumber?: string | null;
  thumbnailUrl?: string;
  isOpen24Hours?: boolean;
  operatingHours?: string;
  source?: string;
};

export type PlaceListProps = {
  places: Place[];
  selectedPlaceId: string | null;
  onSelectPlaceId: (id: string) => void;
  sort: SortValue;
  onChangeSort: (sort: SortValue) => void;
};

export type PlaceCardProps = {
  place: Place;
  isSelected?: boolean;
  onSelect: (id:string) => void;
};

export type SortValue = "distance" | "24hour";

export type SortToggleProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
};

export type PlaceDetailProps = {
  place: PlaceDetail | null;
  loading: boolean;
  error: boolean;
  refetch: () => void;
}

export type PlaceLocation = {
  lat: number;
  lng: number;
};

export type DetailsAvailable = {
  reviews: boolean;
  thumbnail: boolean;
  message: string;
};

export type PlaceDetail = {
  id: string;
  name: string;
  category: WaitingCategoryKey;
  address: string;
  phoneNumber: string | null;
  distance: number;
  location: PlaceLocation;
  operatingHours: string | null;
  isCurrentlyOpen: boolean;
  isOpen24Hours: boolean;
  source: string;
  recommendReason: string | null;
  thumbnailUrl: string | null;
  kakaoMapUrl: string;
  detailsAvailable: DetailsAvailable;
};

export type StartLocationSearchProps = {
  value: string;
  onChangeValue: (v: string) => void;
  items: Place[];
  loading: boolean;
  error: boolean;
  onSelect: (facility: Place) => void;
};