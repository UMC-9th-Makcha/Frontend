import { useEffect, useState, useRef, memo } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { Navigation } from "lucide-react";

const calculateBearing = (startLat: number, startLng: number, destLat: number, destLng: number) => {
  const startLatRad = (startLat * Math.PI) / 180;
  const startLngRad = (startLng * Math.PI) / 180;
  const destLatRad = (destLat * Math.PI) / 180;
  const destLngRad = (destLng * Math.PI) / 180;

  const y = Math.sin(destLngRad - startLngRad) * Math.cos(destLatRad);
  const x =
    Math.cos(startLatRad) * Math.sin(destLatRad) -
    Math.sin(startLatRad) * Math.cos(destLatRad) * Math.cos(destLngRad - startLngRad);

  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
};

interface IOSDeviceOrientationEvent extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

const useSmartHeading = (currentPos: { lat: number; lng: number }) => {
  const [heading, setHeading] = useState<number>(0);
  const lastPos = useRef<{ lat: number; lng: number } | null>(null);
  const isSensorActive = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const iosEvent = event as IOSDeviceOrientationEvent;
          let compass = -1;

          // iOS
          if (typeof iosEvent.webkitCompassHeading === "number") {
            compass = iosEvent.webkitCompassHeading;
          } 
          // Android (크롬)
          else if (event.alpha !== null) {
            compass = Math.abs(event.alpha - 360);
          }

          if (compass !== -1) {
            isSensorActive.current = true;
            setHeading(compass);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("deviceorientation", handleOrientation, true);
    return () => window.removeEventListener("deviceorientation", handleOrientation, true);
  }, []);

  // PC/GPS 이동 기반 방향 계산
  useEffect(() => {
    if (lastPos.current && !isSensorActive.current) {
      const { lat: prevLat, lng: prevLng } = lastPos.current;
      const { lat: curLat, lng: curLng } = currentPos;

      // 미세한 GPS 튐 방지
      const distLat = Math.abs(prevLat - curLat);
      const distLng = Math.abs(prevLng - curLng);
      
      if (distLat > 0.00002 || distLng > 0.00002) {
        const bearing = calculateBearing(prevLat, prevLng, curLat, curLng);
        setHeading(bearing);
      }
    }
    lastPos.current = currentPos;
  }, [currentPos]);

  return heading;
};

interface UserLocationMarkerProps {
  position: { lat: number; lng: number };
}

const UserLocationMarker = memo(({ position }: UserLocationMarkerProps) => {
  const heading = useSmartHeading(position);

  return (
    <CustomOverlayMap position={position} zIndex={15}>
      <div className="relative flex h-8 w-8 items-center justify-center anti-invert">
        {/* 핑 효과 */}
        <div className="absolute h-full w-full animate-ping rounded-full bg-makcha-navy-400 opacity-40" />
        
        {/* 회전하는 아이콘 */}
        <div
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-makcha-navy-600 shadow-lg will-change-transform"
          style={{
            transform: `rotate(${heading}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <Navigation size={10} fill="white" className="text-white" />
        </div>
      </div>
    </CustomOverlayMap>
  );
});

export default UserLocationMarker;