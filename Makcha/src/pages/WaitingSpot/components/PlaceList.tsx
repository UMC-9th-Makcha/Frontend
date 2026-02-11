import { PlaceCard } from "./PlaceCard";
import { SortToggle } from "./SortToggle";
import type { PlaceListProps } from "../types/waitingspot";
import { EmptyState } from "../common/EmptyState";
import React from "react";

export const PlaceList = ({ places, selectedPlaceId, onSelectPlaceId, sort, onChangeSort }: PlaceListProps) => {
  return (
    <React.Fragment>
      <SortToggle value={sort} onChange={onChangeSort} />
      {places.length === 0 ? (
        <EmptyState className="pointer-events-none" message="주변 대기 장소가 없습니다." />
      ) : (
        <div className="space-y-6 py-2 px-2 mb-20">
          {places.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              isSelected={place.id === selectedPlaceId}
              onSelect={onSelectPlaceId} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
