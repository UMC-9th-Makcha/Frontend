import React, { useEffect, useState, useMemo } from "react";
import { Map, CustomOverlayMap, Polyline, useKakaoLoader } from "react-kakao-maps-sdk";
import { MapPin, Navigation } from "lucide-react";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import { useUIStore } from "../../../store/useUIStore";
import { DEFAULT_MAP_CENTER, PATH_COLORS } from "./constant";
import type { MapPoint, OriginSearchItem, MapPathSegment } from "../../../types/map";

export interface BaseMapProps {
  selectedPlace?: OriginSearchItem | null;
  origin?: OriginSearchItem | null;
  destination?: OriginSearchItem | null;
  segments?: MapPathSegment[];
  onMapClick?: (item: OriginSearchItem) => void;
}

const BaseMap = ({ selectedPlace, origin, destination, segments = [], onMapClick }: BaseMapProps) => {
  const [loading, sdkError] = useKakaoLoader({ appkey: import.meta.env.VITE_KAKAO_JS_KEY });
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  
  const { location: userLoc } = useCurrentLocation();
  const isDarkMode = useUIStore((s) => s.isDarkMode);

  // 마커 관리
  const markers = useMemo(() => [
    ...(origin ? [{ ...origin, mType: "origin", color: "#4574C6" }] : []),
    ...(destination ? [{ ...destination, mType: "dest", color: "#F43F5E" }] : []),
    ...(selectedPlace ? [{ ...selectedPlace, mType: "select", color: "#10B981" }] : []),
  ], [origin, destination, selectedPlace]);

  // 지도 이동
  useEffect(() => {
    if (!map) return;

    if (selectedPlace && !origin && !destination) {
      map.panTo(new kakao.maps.LatLng(selectedPlace.position.lat, selectedPlace.position.lng));
      map.setLevel(3);
    } else if (markers.length > 0 || segments.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();
      markers.forEach(m => bounds.extend(new kakao.maps.LatLng(m.position.lat, m.position.lng)));

      segments.forEach((s) => s.points.forEach((p: MapPoint) => {
        bounds.extend(new kakao.maps.LatLng(p.lat, p.lng));
      }));
      
      map.setBounds(bounds, 80);
    }
  }, [map, markers, segments, selectedPlace, origin, destination]);

  if (loading || sdkError) return <div className="h-full w-full bg-gray-100 animate-pulse" />;

  return (
    <div className="h-full w-full relative kakao-map-wrapper">
      <Map 
        center={DEFAULT_MAP_CENTER} 
        style={{ width: "100%", height: "100%" }} 
        onCreate={setMap}
        onClick={(_t, e) => onMapClick?.({
          id: `click-${Date.now()}`,
          name: "지도에서 선택한 위치",
          position: { lat: e.latLng.getLat(), lng: e.latLng.getLng() }
        })}
      >
        {/* 경로 그리기 */}
        {segments.map((seg, i) => (
          <React.Fragment key={`p-${i}`}>
            <Polyline 
              path={seg.points} 
              strokeWeight={12} 
              strokeColor={isDarkMode ? "#1A1A1A" : "#FFFFFF"} 
              strokeOpacity={0.8} 
              zIndex={1} 
            />
            <Polyline 
              path={seg.points} 
              strokeWeight={8} 
              strokeColor={isDarkMode ? PATH_COLORS[seg.type]?.dark : PATH_COLORS[seg.type]?.light} 
              zIndex={3} 
              strokeStyle={seg.type === "WALK" ? "dash" : "solid"} 
            />
          </React.Fragment>
        ))}

        {/* 통합 핀 렌더링 */}
        {markers.map(m => (
          <CustomOverlayMap key={`${m.mType}-${m.id}`} position={m.position} yAnchor={1.1} zIndex={m.mType === "select" ? 20 : 10}>
            <div className="flex flex-col items-center anti-invert">
              <div className="mb-1 rounded-md bg-white dark:bg-makcha-navy-800 px-2 py-0.5 text-[10px] font-bold shadow-md dark:text-white transition-colors duration-300">
                {m.name}
              </div>
              <MapPin size={m.mType === "select" ? 40 : 34} fill={m.color} stroke="white" strokeWidth={1.5} />
            </div>
          </CustomOverlayMap>
        ))}

        {/* GPS */}
        {userLoc && (
          <CustomOverlayMap position={userLoc} zIndex={15}>
            <div className="relative flex h-8 w-8 items-center justify-center anti-invert">
              <div className="absolute h-full w-full animate-ping rounded-full bg-makcha-navy-400 opacity-40" />
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-makcha-navy-600 shadow-lg shadow-makcha-navy-200/50">
                <Navigation size={10} fill="white" className="text-white" />
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </Map>
    </div>
  );
};

export default React.memo(BaseMap);