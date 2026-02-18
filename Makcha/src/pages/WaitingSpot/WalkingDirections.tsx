import LoadingSpinner from "../../components/common/loadingSpinner";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WaitingSpotHeader } from "./common/WaitingSpotHeader";
import BaseMap from "../../components/common/Map";
import { WalkingDirectionLayout } from "./layouts/WalkingDirectionLayout";
import { DirectionDetailPanel } from "./panels/DirectionDetailPanel";
import { ChevronLeft } from "lucide-react";
import { FooterButton } from "./common/FooterButton";
import { DirectionSearch } from "./components/DirectionSearch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useWalkingRoute } from "./hooks/useWalkingRoute";
import { useAuthStore } from "../../store/useAuthStore";
import type { MapMarker } from "../../types/map";
import { DirectionList } from "./components/DirectionList";
import { useDebounce } from "./hooks/useDebounce";
import { useFacilitiesSearch } from "./hooks/useFacilitiesSearch";
import type { Origin } from "./types/waitingspot";
import { EmptyState } from "./common/EmptyState";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { getDistance, getLevelByDistance } from "./utils/mapUtils";

export default function WalkingDirections() {
  const navigate = useNavigate();

  const accessToken = useAuthStore((s) => s.accessToken);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const startLat = Number(searchParams.get("startLat"));
  const startLng = Number(searchParams.get("startLng"));
  const startName = String(searchParams.get("startName") ?? "현위치");
  const endLat = Number(searchParams.get("endLat"));
  const endLng = Number(searchParams.get("endLng"));
  const endName = String(searchParams.get("endName"));

  const [origin, setOrigin] = useState<Origin>({
  id: "start",
  name: startName,
  lat: startLat,
  lng: startLng,
});

  const baseLat = origin.lat;
  const baseLng = origin.lng;

  const [mapLevel, setMapLevel] = useState<number>(3);

  //const [routeCategory, setRouteCategory] = useState<RouteCategoryKey>("shortest");

  //detail 창 open, close
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const onDirectionStart = () => {
    setIsDetailOpen(true);
  };

  //검색 API
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  const { facilities, facilitiesLoading, facilitiesError } = useFacilitiesSearch({
    latitude: baseLat,
    longitude: baseLng,
    keyword: debouncedKeyword.trim(),
    isHydrated,
    accessToken,
  });
  const items = facilities?.facilities ?? [];

  //도보 상세 패널 API
  const { routeData, routeLoading, routeError, routeRefetch } = useWalkingRoute({
    startLat: baseLat,
    startLng: baseLng,
    endLat,
    endLng,
    isHydrated,
    accessToken,
  });

  // 마커 데이터 변환 
  const mapMarkers = useMemo<MapMarker[]>(() => {
    return [
      {
        id: "start",
        name: "출발지",
        position: { lat: baseLat, lng: baseLng },
        variant: "start",
      },
      {
        id: "end",
        name: endName || "도착지",
        position: { lat: endLat, lng: endLng },
        variant: "end",
      },
    ];
  }, [baseLat, baseLng, endLat, endLng, endName]);

  const handleSelectFacility = useCallback((facility: any) => {
  setOrigin({
    id: facility.id,
    name: facility.name,
    lat: facility.lat,
    lng: facility.lng,
  });
  }, []);

  // 출발지 재검색 -> 맵 레벨 변경
  useEffect(() => {
    if (!baseLat || !baseLng || !endLat || !endLng) return;

    const distance = getDistance(baseLat, baseLng, endLat, endLng);

    const nextLevel = getLevelByDistance(distance);
    setMapLevel(nextLevel);

  }, [baseLat, baseLng, endLat, endLng]);

  // 경로 안내 패널 새로고침
  const { location } = useCurrentLocation();
  const [isUpdating, setIsUpdating] = useState(false);
  const prevLocationRef = useRef<{ lat: number; lng: number } | null>(null);
  const accumulatedDistanceRef = useRef(0);

  useEffect(() => {
    if (!location) return;

    if (!prevLocationRef.current) {
      prevLocationRef.current = location;
      return;
    }

    const movedDistance = getDistance(
      prevLocationRef.current.lat,
      prevLocationRef.current.lng,
      location.lat,
      location.lng
    );

    accumulatedDistanceRef.current += movedDistance;

    // 예: 50m 이동하면 재요청
    if (accumulatedDistanceRef.current > 50 && !isUpdating) {
      setIsUpdating(true);

      routeRefetch().finally(() => {
        setIsUpdating(false);
        accumulatedDistanceRef.current = 0;
        prevLocationRef.current = location;
      });
    }

    prevLocationRef.current = location;

  }, [location, routeRefetch, isUpdating]);


  return (
    <div className="min-h-dvh w-full overflow-hidden">
      <WalkingDirectionLayout
        header={
          <div className="relative flex items-start mt-4">
            <button
              type="button"
              onClick={() => navigate(`/spot/${type}`)}
              className="absolute -top-8 text-gray-600 transition-all duration-200 ease-in-out active:scale-95 dark:text-white hover:opacity-60"
              aria-label="뒤로가기">
                <ChevronLeft size={24} />
            </button>

            <WaitingSpotHeader title="도보 안내" />
          </div>
        }
        search={<DirectionSearch
          origin={origin.name}
          destination={endName}
          value={keyword}
          onChangeValue={setKeyword}
          items={items}
          loading={facilitiesLoading}
          error={facilitiesError}
          onSelect={handleSelectFacility}
        />
        }
        /*controls={<CategoryTab selected={routeCategory} onChange={setRouteCategory} categories={routeCategories} />}*/
        list={
          routeLoading ? (
            <div className="flex h-full items-center justify-center mt-4">
              <LoadingSpinner />
            </div>
          ) : routeError || !routeData ? (
              <EmptyState
                message="길 정보를 불러오지 못했어요."
                actionLabel="다시 시도"
                className="mt-20"
                onRetry={routeRefetch}
              />
          ) : (
            <DirectionList route={routeData.route} />
          )
        }
        footer={<FooterButton onClick={onDirectionStart} content={`길 안내`} />}
        detail={
          isDetailOpen && routeData ? 
          <DirectionDetailPanel 
          route={routeData.route} 
          instructions={routeData.navigation.instructions} 
          isUpdating={isUpdating}
          /> : null
        }
        onDetailBack={() => setIsDetailOpen(false)}
        map={<BaseMap
          markers={mapMarkers} 
          level={mapLevel}
          />
        }
      />
    </div>
  );
}