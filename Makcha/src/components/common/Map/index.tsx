import React, { useEffect, useMemo, useState, useCallback, memo, useRef } from "react";
import { Map, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { MapPin } from "lucide-react";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import { useUIStore } from "../../../store/useUIStore";
import { DEFAULT_MAP_CENTER, PATH_COLORS, MARKER_COLORS } from "./constant";
import type { BaseMapProps, MapPathSegment, PathType, MapMarker } from "../../../types/map";

import UserLocationMarker from "./components/UserLocationMarker";
import MapReenterButton from "./components/MapReenterButton";
import LoadingSpinner from "../loadingSpinner";

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
  return (
    <CustomOverlayMap position={marker.position} yAnchor={1.1} zIndex={isActive ? 30 : 20}>
      <div className="flex flex-col items-center anti-invert cursor-pointer" onClick={() => onClick(marker)}>
        <div className={`mb-1 rounded-md px-2 py-0.5 text-[10px] font-bold shadow-md transition-colors ${isActive ? "bg-makcha-navy-600 text-white" : "bg-white dark:bg-makcha-navy-800 dark:text-white"}`}>
          {marker.name}
        </div>
        <MapPin size={isActive ? 42 : 34} fill={markerColor} stroke="white" strokeWidth={1.5} />
      </div>
    </CustomOverlayMap>
  );
});

const BaseMap = ({ markers = [], activeId, paths = [], selectedPathId, onMarkerClick, onMapClick }: BaseMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const { location: userLoc, refetch: mapRefetch } = useCurrentLocation();
  const isDarkMode = useUIStore((s) => s.isDarkMode);

  const [isReady, setIsReady] = useState(false);
  const [mapLevel, setMapLevel] = useState(3);
  const isInitialized = useRef(false);
  const lastViewCenter = useRef(DEFAULT_MAP_CENTER);

  // 데이터 범위 계산
  const bounds = useMemo(() => {
    if (markers.length === 0 && paths.length === 0) return null;
    const b = new kakao.maps.LatLngBounds();
    markers.forEach((m) => b.extend(new kakao.maps.LatLng(m.position.lat, m.position.lng)));
    paths.forEach((p) => p.points.forEach((pt) => b.extend(new kakao.maps.LatLng(pt.lat, pt.lng))));
    return b;
  }, [markers, paths]);

  // 초기 중심 계산
  const initialCenter = useMemo(() => {
    if (isInitialized.current) return lastViewCenter.current;
    if (bounds) {
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      return { lat: (sw.getLat() + ne.getLat()) / 2, lng: (sw.getLng() + ne.getLng()) / 2 };
    }
    return userLoc || DEFAULT_MAP_CENTER;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoc]);

  // 지도 로드 후 초기화
  useEffect(() => {
    if (map && !isInitialized.current) {
      if (bounds) map.setBounds(bounds, 30);
      isInitialized.current = true;
      setTimeout(() => {
        const c = map.getCenter();
        lastViewCenter.current = { lat: c.getLat(), lng: c.getLng() };
        setMapLevel(map.getLevel());
        setIsReady(true);
      }, 400);
    }
  }, [map, bounds]);

  const handleUpdateView = useCallback((target: kakao.maps.Map) => {
    const c = target.getCenter();
    lastViewCenter.current = { lat: c.getLat(), lng: c.getLng() };
    setMapLevel(target.getLevel());
  }, []);

  const handleReenterLocation = useCallback(() => {
    if (!map || !userLoc) { mapRefetch(); return; }
    map.panTo(new kakao.maps.LatLng(userLoc.lat, userLoc.lng));
    setMapLevel(3);
  }, [map, userLoc, mapRefetch]);

  return (
    <div className={`h-full w-full relative kakao-map-wrapper ${isDarkMode ? "map-dark-mode" : ""}`}>
      {!isReady && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-makcha-navy-900">
          <LoadingSpinner />
        </div>
      )}

      <MapStyles isDarkMode={isDarkMode} />
      <MapReenterButton onClick={handleReenterLocation} isDarkMode={isDarkMode} />

      <Map
        center={initialCenter}
        level={mapLevel}
        style={{ width: "100%", height: "100%" }}
        onCreate={setMap}
        onClick={(_map, e) => onMapClick?.({ lat: e.latLng.getLat(), lng: e.latLng.getLng() })}
        onDragEnd={handleUpdateView}
        onZoomChanged={handleUpdateView}
      >
        {isReady && (
          <>
            {paths.map((seg, i) => (
              <PathSegment key={`path-${(seg as ExtendedPathSegment).routeId ?? seg.id}-${i}`} seg={seg as ExtendedPathSegment} selectedPathId={selectedPathId ?? undefined} isDarkMode={isDarkMode} />
            ))}
            {markers.map((m) => (
              <MapMarkerItem key={`${m.variant}-${m.id}`} marker={m} isActive={m.id === activeId} onClick={onMarkerClick || (() => {})} />
            ))}
            {userLoc && <UserLocationMarker position={userLoc} />}
          </>
        )}
      </Map>
    </div>
  );
};

export default React.memo(BaseMap);