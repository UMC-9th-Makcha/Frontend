import { useState, useEffect, useCallback, useRef } from "react";

interface ILocation {
  latitude: number;
  longitude: number;
}

interface GeoState {
  location: ILocation | null;
  error: string | null;
  loading: boolean;
}

const isSupported = typeof window !== "undefined" && "geolocation" in navigator;

export const useGeoLocation = (options?: PositionOptions) => {
  const [state, setState] = useState<GeoState>({
    location: null,
    error: isSupported ? null : "지원하지 않는 브라우저입니다.",
    loading: isSupported,
  });

  const isFetched = useRef(false);

  const handleSuccess = useCallback((pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setState({
      location: { latitude, longitude },
      error: null,
      loading: false,
    });
  }, []);

  const handleError = useCallback((err: GeolocationPositionError) => {
    setState((prev) => ({
      ...prev,
      error: err.message,
      loading: false,
    }));
  }, []);

  useEffect(() => {
    if (!isSupported || isFetched.current) return;

    let isMounted = true;
    isFetched.current = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (isMounted) handleSuccess(pos);
      },
      (err) => {
        if (isMounted) handleError(err);
      },
      options
    );

    return () => {
      isMounted = false;
    };
  }, [handleSuccess, handleError, options]);

  return state;
};