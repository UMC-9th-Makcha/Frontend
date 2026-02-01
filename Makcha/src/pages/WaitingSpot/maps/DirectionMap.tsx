import BaseMap from "../../../components/common/Map/index"
import type { MapMarker, MapPathSegment } from "../../../types/map";

type DirectionMapProps = {
  markers: MapMarker[];
  paths: MapPathSegment[];
  activeId?: string | number | null;
  onMarkerClick: (marker: MapMarker) => void;
};

export const DirectionMap = ({markers, paths, activeId, onMarkerClick} : DirectionMapProps) => {
  return (
    <BaseMap
      markers={markers}
      paths={paths}
      activeId={activeId}
      onMarkerClick={onMarkerClick}
    />
  );
};
