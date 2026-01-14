import { useState, useEffect } from "react";

interface ILocation {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = (
  options?: PositionOptions
) => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      options
    );
  }, []);

  return { location, error, loading };
};
