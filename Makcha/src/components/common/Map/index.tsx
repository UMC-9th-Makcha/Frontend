import { useEffect, useMemo, useState, useCallback, memo, useRef } from "react";
import { Map, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { MapPin } from "lucide-react";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import { useUIStore } from "../../../store/useUIStore";
import { DEFAULT_MAP_CENTER, PATH_COLORS, MARKER_COLORS } from "./constant";
import type { BaseMapProps, MapPathSegment, PathType, MapMarker } from "../../../types/map";

import UserLocationMarker from "./components/UserLocationMarker";
import MapReenterButton from "./components/MapReenterButton";

interface ExtendedPathSegment extends MapPathSegment {
  routeId?: string;
  type: PathType;
}

const MapStyles = memo(({ isDarkMode }: { isDarkMode: boolean }) => {
  if (!isDarkMode) return null;
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      .map-dark-mode .kakao-map-wrapper [style*="background-color: white"],
      .map-dark-mode .kakao-map-wrapper canvas,
      .map-dark-mode .kakao-map-wrapper img[src*="t1.kakaocdn.net/mapjsapi"] {
        filter: invert(95%) hue-rotate(180deg) brightness(0.9) contrast(1.1) !important;
      }
      .map-dark-mode .anti-invert { filter: invert(100%) hue-rotate(-180deg) !important; }
    ` }} />
  );
});

const PathSegment = memo(({ seg, selectedPathId, isDarkMode }: { seg: ExtendedPathSegment; selectedPathId?: string; isDarkMode: boolean; }) => {
  const routeId = seg.routeId ?? seg.id;
  const isSelected = !selectedPathId || routeId === selectedPathId;
  const isWalk = seg.type === "WALK";

  const colors = useMemo(() => ({
    outer: isSelected 
      ? (isWalk ? (isDarkMode ? "#4B5563" : "#9CA3AF") : (isDarkMode ? "#0B0B0B" : "#FFFFFF"))
      : (isDarkMode ? "#111827" : "#E5E7EB"),
    inner: isSelected
      ? (isWalk ? "#FFFFFF" : (isDarkMode ? (PATH_COLORS[seg.type]?.dark ?? "#3B82F6") : (PATH_COLORS[seg.type]?.light ?? "#3B82F6")))
      : (isDarkMode ? "#374151" : "#D1D5DB")
  }), [isSelected, isWalk, isDarkMode, seg.type]);

  return (
    <>
      <Polyline path={seg.points} strokeWeight={isSelected ? 12 : 11} strokeColor={colors.outer} strokeOpacity={isSelected ? 0.55 : 0.45} zIndex={isSelected ? 2 : 1} />
      <Polyline path={seg.points} strokeWeight={isSelected ? 7 : 6} strokeColor={colors.inner} strokeOpacity={seg.type === "WALK" ? 0.9 : (isSelected ? 0.9 : 0.2)} zIndex={isSelected ? 4 : 3} strokeStyle={isWalk ? "dash" : "solid"} />
    </>
  );
});

const MapMarkerItem = memo(({ marker, isActive, onClick }: { marker: MapMarker; isActive: boolean; onClick: (m: MapMarker) => void; }) => {
  const markerColor = isActive ? MARKER_COLORS.select : MARKER_COLORS[marker.variant];
  const handleInternalClick = useCallback(() => onClick(marker), [onClick, marker]);

  return (
    <CustomOverlayMap position={marker.position} yAnchor={1.1} zIndex={isActive ? 30 : 20}>
      <div className="flex flex-col items-center anti-invert cursor-pointer" onClick={handleInternalClick}>
        <div className={`mb-1 rounded-md px-2 py-0.5 text-[10px] font-bold shadow-md transition-colors ${isActive ? "bg-makcha-navy-600 text-white" : "bg-white dark:bg-makcha-navy-800 dark:text-white"}`}>
          {marker.name}
        </div>
        <MapPin size={isActive ? 42 : 34} fill={markerColor} stroke="white" strokeWidth={1.5} />
      </div>
    </CustomOverlayMap>
  );
});

const BaseMap = ({ markers = [], activeId, paths = [], selectedPathId, onMarkerClick, onMapClick, level = 3 }: BaseMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const { location: userLoc, refetch: mapRefetch } = useCurrentLocation();
  const isDarkMode = useUIStore((s) => s.isDarkMode);

  const [mapLevel, setMapLevel] = useState(level);
  
  const isPositioned = useRef(false);

  // marker 바뀌면 지도 정렬 허용
  useEffect(() => {
    if (markers.length === 0) return;
    isPositioned.current = false;
  }, [markers]);

  const bounds = useMemo(() => {
    if (markers.length === 0 && paths.length === 0) return null;
    const b = new kakao.maps.LatLngBounds();
    markers.forEach((m) => b.extend(new kakao.maps.LatLng(m.position.lat, m.position.lng)));
    paths.forEach((p) => p.points.forEach((pt) => b.extend(new kakao.maps.LatLng(pt.lat, pt.lng))));
    return b;
  }, [markers, paths]);

  useEffect(() => {
    if (!map || isPositioned.current) return;

    if (bounds) {
      map.setBounds(bounds, 32);
      isPositioned.current = true;
    } else if (userLoc) {
      map.panTo(new kakao.maps.LatLng(userLoc.lat, userLoc.lng));
      isPositioned.current = true;
    }
  }, [map, bounds, userLoc]);

  // 핸들러 최적화
  const handleMarkerClick = useCallback((m: MapMarker) => {
    onMarkerClick?.(m);
  }, [onMarkerClick]);

  const handleMapClick = useCallback((_t: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => {
    onMapClick?.({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
  }, [onMapClick]);

  const handleViewChange = useCallback((target: kakao.maps.Map) => {
    const nextLevel = target.getLevel();
    setMapLevel((prev) => (prev === nextLevel ? prev : nextLevel));
  }, []);

  const handleReenter = useCallback(() => {
    if (!map || !userLoc) {
      mapRefetch();
      return;
    }
    map.panTo(new kakao.maps.LatLng(userLoc.lat, userLoc.lng));
    setMapLevel(3);
  }, [map, userLoc, mapRefetch]);

  return (
    <div className={`h-full w-full relative kakao-map-wrapper ${isDarkMode ? "map-dark-mode" : ""}`}>
      <MapStyles isDarkMode={isDarkMode} />
      
      <div className="absolute bottom-6 right-6 z-40">
        <MapReenterButton onClick={handleReenter} isDarkMode={isDarkMode} />
      </div>

      <Map
        center={DEFAULT_MAP_CENTER}
        level={mapLevel}
        style={{ width: "100%", height: "100%" }}
        onCreate={setMap}
        onClick={handleMapClick}
        onDragEnd={handleViewChange}
        onZoomChanged={handleViewChange}
      >
        {map && (
          <>
            {paths.map((seg, i) => (
              <PathSegment 
                key={`path-${(seg as ExtendedPathSegment).routeId ?? seg.id}-${i}`} 
                seg={seg as ExtendedPathSegment} 
                selectedPathId={selectedPathId ?? undefined} 
                isDarkMode={isDarkMode} 
              />
            ))}
            {markers.map((m) => (
              <MapMarkerItem 
                key={`marker-${m.id}`} 
                marker={m} 
                isActive={m.id === activeId} 
                onClick={handleMarkerClick} 
              />
            ))}
            {userLoc && <UserLocationMarker position={userLoc} />}
          </>
        )}
      </Map>

      {/* 로딩 인디케이터*/}
      {(!userLoc && markers.length === 0 && paths.length === 0) && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 dark:bg-makcha-navy-800/90 px-4 py-1.5 rounded-full shadow-md backdrop-blur-sm">
          <p className="text-[12px] font-bold text-makcha-navy-600 dark:text-makcha-yellow-400 animate-pulse">
            주변 정보를 불러오는 중...
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(BaseMap);