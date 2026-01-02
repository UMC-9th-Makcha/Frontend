export type CategoryKey = "all" | "night-cafe" | "pc-cafe" | "sauna";

export type CategoryTabProps = {
  selected: CategoryKey;
  onChange: (key: CategoryKey) => void;
};

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
};

export type PlaceCardProps = {
  place: Place;
};
