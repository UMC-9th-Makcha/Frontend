import type { PlaceListProps } from "../../types/waitingspot";
import { PlaceCard } from "./PlaceCard";

export const PlaceList = ({ places }: PlaceListProps) => {
  if (places.length === 0) {
    return <p className="text-sm text-gray-400">장소가 없습니다.</p>;
  }

  return (
    <div className="space-y-[34px] py-10">
      {places.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
};
