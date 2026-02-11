import { useEffect, useState, useRef, memo, useCallback } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface DeviceOrientationEventExtended extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

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
  const lastUpdateTime = useRef(0);

  const updateHeading = useCallback((targetAngle: number) => {
    const now = Date.now();
    if (now - lastUpdateTime.current < 40) return;

    const current = internalHeading.current;
    const currentNormalized = ((current % 360) + 360) % 360;

    let delta = targetAngle - currentNormalized;
    if (delta > 180) delta -= 360;
    else if (delta < -180) delta += 360;

    if (Math.abs(delta) < 0.5) return;

    const lerpFactor = 0.3; 
    const smoothedDelta = delta * lerpFactor;
    
    const nextHeading = current + smoothedDelta;
    internalHeading.current = nextHeading;
    setHeading(nextHeading);
    lastUpdateTime.current = now;
  }, []);

  useEffect(() => {
    const handleOrientation = (e: Event) => {
      const event = e as DeviceOrientationEventExtended;
      let compass = -1;

      if (event.webkitCompassHeading !== undefined) {
        compass = event.webkitCompassHeading; // iOS
      } else if (event.alpha !== null) {
        compass = 360 - event.alpha; // Android
      }

      if (compass !== -1) {
        isSensorActive.current = true;
        updateHeading(compass);
      }
    };

    const eventType = "ondeviceorientationabsolute" in window 
      ? "deviceorientationabsolute" 
      : "deviceorientation";

    window.addEventListener(eventType, handleOrientation, true);
    return () => window.removeEventListener(eventType, handleOrientation, true);
  }, [updateHeading]);

  // GPS 기반 로직
  useEffect(() => {
    if (lastPos.current && !isSensorActive.current) {
      const { lat: pLat, lng: pLng } = lastPos.current;
      const { lat: cLat, lng: cLng } = currentPos;

      if (Math.abs(pLat - cLat) > 0.00002 || Math.abs(pLng - cLng) > 0.00002) {
        const bearing = (calculateBearing(pLat, pLng, cLat, cLng) + 360) % 360;
        updateHeading(bearing);
      }
    }
    lastPos.current = currentPos;
  }, [currentPos, updateHeading]);

  return heading;
};

const UserLocationMarker = memo(({ position }: { position: { lat: number; lng: number } }) => {
  const heading = useSmartHeading(position);

  return (
    <CustomOverlayMap position={position} zIndex={15} xAnchor={0.5} yAnchor={0.5}>
      <div className="relative flex h-16 w-16 items-center justify-center pointer-events-none">
        
        {/* 파동 애니메이션 */}
        <div className="absolute h-10 w-10 animate-ping rounded-full bg-blue-400 opacity-20" />
        <div className="absolute h-8 w-8 rounded-full bg-blue-500/20" />

        {/* 실제 방향 마커 */}
        <div
          className="relative z-20 flex items-center justify-center will-change-transform"
          style={{
            transform: `rotate(${heading}deg)`,
            transition: "transform 0.12s linear", 
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            {/* 그림자 대용 경로 */}
            <path
              d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"
              fill="rgba(0,0,0,0.15)"
              transform="translate(0, 1)"
            />
            {/* 메인 화살표 */}
            <path
              d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"
              fill="#3B82F6" 
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </CustomOverlayMap>
  );
});

export default UserLocationMarker;