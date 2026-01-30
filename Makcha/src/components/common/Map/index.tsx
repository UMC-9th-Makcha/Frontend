import React, { useEffect, useState, useRef } from "react";
import { Map, CustomOverlayMap, Polyline, useKakaoLoader } from "react-kakao-maps-sdk";
import { MapPin, Navigation } from "lucide-react";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import { useUIStore } from "../../../store/useUIStore";
import { DEFAULT_MAP_CENTER, PATH_COLORS, MARKER_COLORS } from "./constant";
import type { BaseMapProps } from "../../../types/map";

const BaseMap = ({ markers = [], activeId, paths = [], selectedPathId, onMarkerClick, onMapClick }: BaseMapProps) => {
  const [loading, sdkError] = useKakaoLoader({ appkey: import.meta.env.VITE_KAKAO_JS_KEY });
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const { location: userLoc } = useCurrentLocation();
  const isDarkMode = useUIStore((s) => s.isDarkMode);
  
  const isInitialCenterSet = useRef(false);
  const lastDataKey = useRef("");

  // 지도 초기 위치
  useEffect(() => {
    if (!map) return;

    const startMarker = markers.find(m => m.variant === 'start');
    
    if (startMarker && !isInitialCenterSet.current) {
      map.setCenter(new kakao.maps.LatLng(startMarker.position.lat, startMarker.position.lng));
      isInitialCenterSet.current = true;
    } else if (userLoc && !isInitialCenterSet.current) {
      map.setCenter(new kakao.maps.LatLng(userLoc.lat, userLoc.lng));
      isInitialCenterSet.current = true;
    }
  }, [map, userLoc, markers]);

  useEffect(() => {
    if (!map || (markers.length === 0 && paths.length === 0)) return;

    const currentDataKey = `m:${markers.length}-p:${paths.length}-a:${activeId}`;
    if (lastDataKey.current !== currentDataKey) {
      const bounds = new kakao.maps.LatLngBounds();
      markers.forEach(m => bounds.extend(new kakao.maps.LatLng(m.position.lat, m.position.lng)));
      paths.forEach(p => p.points.forEach(pt => bounds.extend(new kakao.maps.LatLng(pt.lat, pt.lng))));
      
      map.setBounds(bounds, 30);
      lastDataKey.current = currentDataKey;
    }
  }, [map, markers, paths, activeId]);

  if (loading || sdkError) return <div className="h-full w-full bg-gray-100 animate-pulse" />;

  return (
    <div className={`h-full w-full relative kakao-map-wrapper ${isDarkMode ? "map-dark-mode" : ""}`}>
      <style>{`
        .map-dark-mode .kakao-map-wrapper [style*="background-color: white"],
        .map-dark-mode .kakao-map-wrapper canvas,
        .map-dark-mode .kakao-map-wrapper img[src*="t1.daumcdn.net/mapjsapi"] {
          filter: invert(95%) hue-rotate(180deg) brightness(0.9) contrast(1.1) !important;
        }
        .map-dark-mode .anti-invert {
          filter: invert(100%) hue-rotate(-180deg) !important;
        }
      `}</style>

      <Map 
        center={DEFAULT_MAP_CENTER} 
        style={{ width: "100%", height: "100%" }} 
        onCreate={setMap}
        onClick={(_t, e) => onMapClick?.({ lat: e.latLng.getLat(), lng: e.latLng.getLng() })}
      >
        {paths.map((seg, i) => {
          const isWalk = seg.type === "WALK";
          // 선택된 경로가 없으면 모두 색이 나타나고, 선택한 경로가 있으면 그것만 색 나머진 회색
          const isSelected = !selectedPathId || seg.id === selectedPathId;

          // 미선택 
          const inactiveColor = isDarkMode ? "#374151" : "#D1D5DB";
          return (
            <React.Fragment key={`path-${i}`}>
              <Polyline
                path={seg.points}
                strokeWeight={12}
                strokeColor={isSelected
                  ? (isWalk ? (isDarkMode ? "#4B5563" : "#9CA3AF") : (isDarkMode ? "#1A1A1A" : "#FFFFFF"))
                  : (isDarkMode ? "#111827" : "#E5E7EB")}
                strokeOpacity={0.8}
                zIndex={isSelected ? 2 : 1}
              />
              <Polyline
                path={seg.points}
                strokeWeight={8}
                strokeColor={isSelected
                  ? (isWalk ? "#FFFFFF" : (isDarkMode ? PATH_COLORS[seg.type]?.dark : PATH_COLORS[seg.type]?.light))
                  : inactiveColor}
                zIndex={isSelected ? 4 : 3}
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