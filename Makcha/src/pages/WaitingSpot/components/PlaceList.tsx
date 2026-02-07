import React, { useMemo, useState } from "react";
import { PlaceCard } from "./PlaceCard";
import { SortToggle } from "./SortToggle";
import type { PlaceListProps, SortValue } from "../../../types/waitingspot";
import { EmptyState } from "../common/EmptyState";

export const PlaceList = ({ places, selectedPlaceId, onSelectPlaceId }: PlaceListProps) => {
  const [sort, setSort] = useState<SortValue>("distance");

  const filteredPlaces = useMemo(() => {
    if (sort === "open24h") {
      return places.filter((p) => p.operatingHours == "24시간 영업");
    }
    return places;
  }, [places, sort]);

  return (
    <React.Fragment>
      <SortToggle value={sort} onChange={setSort} />
      {filteredPlaces.length === 0 ? (
        <EmptyState className="pointer-events-none" message="주변 대기 장소가 없습니다." />
      ) : (
        <div className="space-y-6 py-2 px-2">
          {filteredPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              isSelected={place.id === selectedPlaceId}
              onSelect={() => onSelectPlaceId(place.id)} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
