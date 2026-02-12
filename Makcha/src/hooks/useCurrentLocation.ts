import { useState, useEffect, useCallback, useRef } from "react";
import type { MapPoint } from "../types/map";

export const useCurrentLocation = () => {
  const [state, setState] = useState<{
    location: MapPoint | null;
    error: string | null;
    loading: boolean;
  }>({
    location: null,
    error: null,
    loading: false,
  });

  const watchId = useRef<number | null>(null);
  const lastUpdate = useRef<number>(0);

  const handleSuccess = useCallback((pos: GeolocationPosition) => {
    const now = Date.now();
    if (now - lastUpdate.current < 3000) return;
    lastUpdate.current = now;

    const { latitude: lat, longitude: lng } = pos.coords;
    
    setState((prev) => {
      if (prev.location?.lat.toFixed(6) === lat.toFixed(6) && 
          prev.location?.lng.toFixed(6) === lng.toFixed(6)) {
        return { ...prev, loading: false };
      }
      return {
        location: { lat, lng },
        error: null,
        loading: false,
      };
    });
  }, []);

  const handleError = useCallback((err: GeolocationPositionError) => {
    let message = "알 수 없는 에러가 발생했습니다.";
    switch (err.code) {
      case err.PERMISSION_DENIED:
        message = "위치 정보 권한이 거부되었습니다.";
        break;
      case err.POSITION_UNAVAILABLE:
        message = "위치 정보를 사용할 수 없습니다.";
        break;
      case err.TIMEOUT:
        message = "위치 정보를 가져오는 시간이 초과되었습니다.";
        break;
    }
    setState((prev) => ({ ...prev, error: message, loading: false }));
  }, []);

  const refetch = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    
    setState((prev) => ({ ...prev, loading: true }));
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, [handleSuccess, handleError]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState((prev) => ({ ...prev, error: "Geolocation 비지원 브라우저입니다." }));
      return;
    }

    watchId.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      { 
        enableHighAccuracy: true,
        timeout: 15000, 
        maximumAge: 10000
      }
    );
    
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [handleSuccess, handleError]);

  return { ...state, refetch };
};