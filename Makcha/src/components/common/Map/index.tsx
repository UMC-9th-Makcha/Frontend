import React, { useEffect, useState } from "react";
import { Map, CustomOverlayMap, Polyline, useKakaoLoader } from "react-kakao-maps-sdk";
import { MapPin, Navigation } from "lucide-react";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import { useUIStore } from "../../../store/useUIStore";
import { DEFAULT_MAP_CENTER, PATH_COLORS, MARKER_COLORS } from "./constant";
import type { MapPoint, MapMarker, MapPathSegment } from "../../../types/map";

export interface BaseMapProps {
  markers?: MapMarker[];                       // 지도에 표시할 모든 마커(출발, 도착, 장소 등) 리스트
  activeId?: string | number | null;           // 현재 선택되어 강조 및 포커스할 마커의 ID
  paths?: MapPathSegment[];                    // 지도에 그릴 경로 선(도보 점선, 교통 실선 등) 리스트
  onMarkerClick?: (marker: MapMarker) => void; // 마커를 클릭했을 때 실행할 함수
  onMapClick?: (pos: MapPoint) => void;        // 지도의 빈 곳을 클릭했을 때 실행할 함수
}

const BaseMap = ({ markers = [], activeId, paths = [], onMarkerClick, onMapClick }: BaseMapProps) => {
  const [loading, sdkError] = useKakaoLoader({ appkey: import.meta.env.VITE_KAKAO_JS_KEY });
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const { location: userLoc } = useCurrentLocation();
  const isDarkMode = useUIStore((s) => s.isDarkMode);

  useEffect(() => {
    if (!map || (markers.length === 0 && paths.length === 0)) return;
    const bounds = new kakao.maps.LatLngBounds();
    markers.forEach(m => bounds.extend(new kakao.maps.LatLng(m.position.lat, m.position.lng)));
    paths.forEach(p => p.points.forEach(pt => bounds.extend(new kakao.maps.LatLng(pt.lat, pt.lng))));
    map.setBounds(bounds, 80);
  }, [map, markers, paths]);

  if (loading || sdkError) return <div className="h-full w-full bg-gray-100 animate-pulse" />;

  return (
    <div className="h-full w-full relative kakao-map-wrapper">
      <Map center={DEFAULT_MAP_CENTER} style={{ width: "100%", height: "100%" }} onCreate={setMap}
        onClick={(_t, e) => onMapClick?.({ lat: e.latLng.getLat(), lng: e.latLng.getLng() })}>
        
        {paths.map((seg, i) => {
          const isWalk = seg.type === "WALK";
          return (
            <React.Fragment key={`path-${i}`}>
              <Polyline 
                path={seg.points} 
                strokeWeight={12} 
                strokeColor={isWalk ? (isDarkMode ? "#4B5563" : "#9CA3AF") : (isDarkMode ? "#1A1A1A" : "#FFFFFF")}
                strokeOpacity={0.8} 
                zIndex={1} 
              />
              <Polyline 
                path={seg.points} 
                strokeWeight={8} 
                strokeColor={isWalk ? "#FFFFFF" : (isDarkMode ? PATH_COLORS[seg.type]?.dark : PATH_COLORS[seg.type]?.light)}
                zIndex={3} 
                strokeStyle={isWalk ? "dash" : "solid"} 
              />
            </React.Fragment>
          );
        })}

        {markers.map(m => {
          const isActive = m.id === activeId;
          const markerColor = isActive ? MARKER_COLORS.select : MARKER_COLORS[m.variant];
          return (
            <CustomOverlayMap key={`${m.variant}-${m.id}`} position={m.position} yAnchor={1.1} zIndex={isActive ? 30 : 20}>
              <div className="flex flex-col items-center anti-invert cursor-pointer" onClick={() => onMarkerClick?.(m)}>
                <div className={`mb-1 rounded-md px-2 py-0.5 text-[10px] font-bold shadow-md transition-colors duration-300
                  ${isActive ? 'bg-makcha-navy-600 text-white' : 'bg-white dark:bg-makcha-navy-800 dark:text-white'}`}>
                  {m.name}
                </div>
                <MapPin size={isActive ? 42 : 34} fill={markerColor} stroke="white" strokeWidth={1.5} />
              </div>
            </CustomOverlayMap>
          );
        })}

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