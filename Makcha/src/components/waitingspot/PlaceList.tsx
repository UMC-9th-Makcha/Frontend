import React, { useState } from "react";
import type { PlaceListProps, SortValue } from "../../types/waitingspot";
import { PlaceCard } from "./PlaceCard";
import { SortToggle } from "./SortToggle";

export const PlaceList = ({ places, selectedPlaceId, onSelectPlaceId }: PlaceListProps) => {
  const [sort, setSort] = useState<SortValue>("distance");

  if (places.length === 0) {
    return <p className="text-sm text-gray-400">장소가 없습니다.</p>;
  }

  return (
    <React.Fragment>
      <SortToggle value={sort} onChange={setSort} />
      <div className="space-y-6 py-6">
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            isSelected={place.id === selectedPlaceId}
            onSelect={() => onSelectPlaceId(place.id)}/>
        ))}
      </div>
    </React.Fragment>
  );
};
