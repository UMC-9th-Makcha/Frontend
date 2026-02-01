import { useState, useEffect } from "react";

interface ILocation {
  latitude: number;
  longitude: number;
}

const isGeolocationSupported = typeof window !== "undefined" && "geolocation" in navigator;

export const useGeoLocation = (options?: PositionOptions) => {
  const [location, setLocation] = useState<ILocation | null>(null);

  const [error, setError] = useState(isGeolocationSupported ? "" : "Geolocation is not supported.");
  const [loading, setLoading] = useState(isGeolocationSupported);

  useEffect(() => {

    if (!isGeolocationSupported) return;

    const handleSuccess = (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ latitude, longitude });
      setLoading(false);
    };

    const handleError = (err: GeolocationPositionError) => {
      setError(err.message);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error, loading };
};