import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import type { Place } from "../../types/waitingspot";

type LatLng = { lat: number; lng: number };

type WaitingSpotMapProps = {
  center: LatLng;
  level?: number;
  places: Place[];
  selectedPlaceId: number | null;
  onClickMarker: (id: number) => void;
};

export const WaitingSpotMap = ({center, level = 3, places, selectedPlaceId, onClickMarker}: WaitingSpotMapProps) => {
  const MAP_KEY = import.meta.env.VITE_KAKAO_JS_KEY as string;

  const [loading, error] = useKakaoLoader({
    appkey: MAP_KEY,
  });

  if (loading) return <div className="h-full w-full" />;
  if (error) return <div className="h-full w-full">지도 로드 실패</div>;

  return (
    <Map
      id="waiting-spot-map"
      center={center}
      isPanto={true}
      style={{ width: "100%", height: "100%" }}
      level={level}
    >
      {places.map((p) => {
        const isSelected = p.id === selectedPlaceId;

        return (
          <MapMarker
            key={p.id}
            position={{ lat: p.lat, lng: p.lng }}
            onClick={() => onClickMarker(p.id)}
            zIndex={isSelected ? 10 : 1}
          />
        );
      })}
    </Map>
  );
}
