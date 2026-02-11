import React, { useEffect, useMemo, useState, useCallback, memo, useRef } from "react";
import { Map, CustomOverlayMap, Polyline, useKakaoLoader } from "react-kakao-maps-sdk";
import { MapPin } from "lucide-react";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import { useUIStore } from "../../../store/useUIStore";
import { DEFAULT_MAP_CENTER, PATH_COLORS, MARKER_COLORS } from "./constant";
import type { BaseMapProps, MapPathSegment, PathType, MapMarker } from "../../../types/map";

import UserLocationMarker from "./components/UserLocationMarker";
import MapReenterButton from "./components/MapReenterButton";

interface LocalBaseMapProps extends BaseMapProps {
  buttonClassName?: string;
}

interface IOSDeviceOrientationEventStatic {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

interface ExtendedPathSegment extends MapPathSegment {
  routeId?: string;
  type: PathType; 
}

const MapStyles = memo(({ isDarkMode }: { isDarkMode: boolean }) => {
  if (!isDarkMode) return null;
  return (
    <style>{`
      .map-dark-mode .kakao-map-wrapper [style*="background-color: white"],
      .map-dark-mode .kakao-map-wrapper canvas,
      .map-dark-mode .kakao-map-wrapper img[src*="t1.kakaocdn.net/mapjsapi"] {
        filter: invert(95%) hue-rotate(180deg) brightness(0.9) contrast(1.1) !important;
        pointer-events: none !important;
      }
      .map-dark-mode .anti-invert { filter: invert(100%) hue-rotate(-180deg) !important; }
    `}</style>
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

const BaseMap = ({
  markers = [],
  activeId,
  paths = [],
  selectedPathId,
  onMarkerClick,
  onMapClick,
}: LocalBaseMapProps) => {
  const [loading, sdkError] = useKakaoLoader({ appkey: import.meta.env.VITE_KAKAO_JS_KEY });
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const { location: userLoc } = useCurrentLocation();
  const isDarkMode = useUIStore((s) => s.isDarkMode);

  const [viewState, setViewState] = useState({
    center: DEFAULT_MAP_CENTER,
    level: 3,
  });

  const isInitialized = useRef(false);

  const bounds = useMemo(() => {
    if (markers.length === 0 && paths.length === 0) return null;
    const b = new kakao.maps.LatLngBounds();
    markers.forEach((m) => b.extend(new kakao.maps.LatLng(m.position.lat, m.position.lng)));
    paths.forEach((p) => p.points.forEach((pt) => b.extend(new kakao.maps.LatLng(pt.lat, pt.lng))));
    return b;
  }, [markers, paths]);

  // 초기 범위 설정
  useEffect(() => {
    if (map && bounds && !isInitialized.current) {
      map.setBounds(bounds, 30);
      isInitialized.current = true;
      
      const timer = setTimeout(() => {
        const c = map.getCenter();
        setViewState({ 
          center: { lat: c.getLat(), lng: c.getLng() }, 
          level: map.getLevel() 
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [map, bounds]);

  // 움직일 때 업데이트
  const handleUpdateView = useCallback((target: kakao.maps.Map) => {
    const c = target.getCenter();
    setViewState({
      center: { lat: c.getLat(), lng: c.getLng() },
      level: target.getLevel(),
    });
  }, []);

  const handleMapClick = useCallback((_map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => {
    onMapClick?.({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
  }, [onMapClick]);

  const handleMarkerClick = useCallback((m: MapMarker) => {
    onMarkerClick?.(m);
  }, [onMarkerClick]);

  const handleReenterLocation = useCallback(() => {
    const DeviceOrientation = DeviceOrientationEvent as unknown as IOSDeviceOrientationEventStatic;
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientation.requestPermission === "function") {
      DeviceOrientation.requestPermission().catch(() => {});
    }
    
    if (map && userLoc) {
      map.panTo(new kakao.maps.LatLng(userLoc.lat, userLoc.lng));
    }
  }, [map, userLoc]);

  if (loading || sdkError) return <div className="h-full w-full bg-gray-100 animate-pulse" />;

  return (
    <div className={`h-full w-full relative kakao-map-wrapper ${isDarkMode ? "map-dark-mode" : ""}`}>
      <MapStyles isDarkMode={isDarkMode} />

      <MapReenterButton 
        onClick={handleReenterLocation} 
        isDarkMode={isDarkMode} 
      />

      <Map
        center={viewState.center}
        level={viewState.level}
        style={{ width: "100%", height: "100%" }}
        onCreate={setMap}
        onClick={handleMapClick}
        onDragEnd={handleUpdateView}
        onZoomChanged={handleUpdateView}
      >

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
            key={`${m.variant}-${m.id}`} 
            marker={m} 
            isActive={m.id === activeId} 
            onClick={handleMarkerClick} 
          />
        ))}

        {userLoc && <UserLocationMarker position={userLoc} />}
      </Map>
    </div>
  );
};

export default React.memo(BaseMap);