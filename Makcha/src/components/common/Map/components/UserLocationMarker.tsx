import { useEffect, useState, useRef, memo } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface DeviceOrientationEventExtended extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

// GPS 기반 방위각 계산
const calculateBearing = (startLat: number, startLng: number, destLat: number, destLng: number) => {
  const startLatRad = (startLat * Math.PI) / 180;
  const startLngRad = (startLng * Math.PI) / 180;
  const destLatRad = (destLat * Math.PI) / 180;
  const destLngRad = (destLng * Math.PI) / 180;

  const y = Math.sin(destLngRad - startLngRad) * Math.cos(destLatRad);
  const x =
    Math.cos(startLatRad) * Math.sin(destLatRad) -
    Math.sin(startLatRad) * Math.cos(destLatRad) * Math.cos(destLngRad - startLngRad);

  return (Math.atan2(y, x) * 180) / Math.PI;
};

const useSmartHeading = (currentPos: { lat: number; lng: number }) => {
  const [heading, setHeading] = useState(0);
  const internalHeading = useRef(0); 
  const lastPos = useRef<{ lat: number; lng: number } | null>(null);
  const isSensorActive = useRef(false);
  const updateHeading = (newAngle: number) => {
    const current = internalHeading.current;
    const currentNormalized = ((current % 360) + 360) % 360;
    
    let delta = newAngle - currentNormalized;
    if (delta > 180) delta -= 360;
    else if (delta < -180) delta += 360;

    const nextHeading = current + delta;
    internalHeading.current = nextHeading;
    setHeading(nextHeading);
  };

  useEffect(() => {
    const handleOrientation = (e: Event) => {
      const event = e as DeviceOrientationEventExtended;
      let compass = -1;

      // 1. iOS
      if (event.webkitCompassHeading !== undefined) {
        compass = event.webkitCompassHeading;
      } 
      // 2. Android
      else if (event.alpha !== null) {
        compass = 360 - event.alpha;
      }

      if (compass !== -1) {
        isSensorActive.current = true;
        updateHeading(compass);
      }
    };

    const eventType = "ondeviceorientationabsolute" in window 
      ? "deviceorientationabsolute" 
      : "deviceorientation";

    window.addEventListener(eventType, handleOrientation as EventListener, true);

    return () => {
      window.removeEventListener(eventType, handleOrientation as EventListener, true);
    };
  }, []);

  // GPS 이동 기반 방향 계산
  useEffect(() => {
    if (lastPos.current && !isSensorActive.current) {
      const { lat: prevLat, lng: prevLng } = lastPos.current;
      const { lat: curLat, lng: curLng } = currentPos;

      const distLat = Math.abs(prevLat - curLat);
      const distLng = Math.abs(prevLng - curLng);

      if (distLat > 0.00002 || distLng > 0.00002) {
        const bearing = (calculateBearing(prevLat, prevLng, curLat, curLng) + 360) % 360;
        updateHeading(bearing);
      }
    }
    lastPos.current = currentPos;
  }, [currentPos]);

  return heading;
};

const UserLocationMarker = memo(({ position }: { position: { lat: number; lng: number } }) => {
  const heading = useSmartHeading(position);

  return (
    <CustomOverlayMap position={position} zIndex={15} xAnchor={0.5} yAnchor={0.5}>
      <div className="relative flex h-14 w-14 items-center justify-center anti-invert pointer-events-none">

        <div className="absolute h-10 w-10 animate-ping rounded-full bg-makcha-navy-400 opacity-20" />
        <div className="absolute h-8 w-8 rounded-full bg-makcha-navy-500 opacity-10" />

        <div
          className="relative z-20 flex items-center justify-center will-change-transform"
          style={{
            transform: `rotate(${heading}deg)`,
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: "drop-shadow(0px 3px 5px rgba(0,0,0,0.3))"
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"
              fill="white"
            />
            <path
              d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"
              className="fill-makcha-navy-600 dark:fill-makcha-yellow-400"
              stroke="white"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        </div>

      </div>
    </CustomOverlayMap>
  );
});

export default UserLocationMarker;