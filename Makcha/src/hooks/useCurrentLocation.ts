import { useState, useEffect, useCallback, useRef } from "react";
import type { MapPoint } from "../types/map";

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<MapPoint | null>(null);
  const [error, setError] = useState<string | null>(() => 
    typeof navigator !== "undefined" && !navigator.geolocation 
      ? "Geolocation을 지원하지 않습니다." 
      : null
  );
  const [loading, setLoading] = useState<boolean>(() => 
    typeof navigator !== "undefined" && !!navigator.geolocation
  );
  
  const watchId = useRef<number | null>(null);

  const handleSuccess = useCallback((pos: GeolocationPosition) => {
    const point: MapPoint = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };
    setLocation(point);
    setError(null);
    setLoading(false);
  }, []);

  const handleError = useCallback((err: GeolocationPositionError) => {
    setError(err.message);
    setLoading(false);
  }, []);

  const refetch = useCallback(() => {
    if (!navigator.geolocation) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, [handleSuccess, handleError]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    watchId.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    
    return () => {
      if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
    };
  }, [handleSuccess, handleError]);

  return { location, error, loading, refetch };
};