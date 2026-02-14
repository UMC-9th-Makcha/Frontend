import LoadingSpinner from "../../components/common/loadingSpinner";
import type { RouteCategoryKey } from "./types/walking-direction";
import { useEffect, useMemo, useState } from "react";
import { WaitingSpotHeader } from "./common/WaitingSpotHeader";
import { CategoryTab } from "./common/CategoryTab";
import BaseMap from "../../components/common/Map";
import { WalkingDirectionLayout } from "./layouts/WalkingDirectionLayout";
import { DirectionDetailPanel } from "./panels/DirectionDetailPanel";
import { ChevronLeft } from "lucide-react";
import { FooterButton } from "./common/FooterButton";
import { routeCategories } from "./common/constants";
import { DirectionSearch } from "./components/DirectionSearch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useWalkingRoute } from "./hooks/useWalkingRoute";
import { useAuthStore } from "../../store/useAuthStore";
import type { MapMarker } from "../../types/map";
import { DirectionList } from "./components/DirectionList";

export default function WalkingDirections() {
  const navigate = useNavigate();

  const accessToken = useAuthStore((s) => s.accessToken);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  const [searchParams] = useSearchParams();

  const startLat = Number(searchParams.get("startLat"));
  const startLng = Number(searchParams.get("startLng"));
  const endLat = Number(searchParams.get("endLat"));
  const endLng = Number(searchParams.get("endLng"));
  const endName = String(searchParams.get("endName"));

  const [routeCategory, setRouteCategory] = useState<RouteCategoryKey>("shortest");

  //detail 창 open, close
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const onDirectionStart = () => {
    setIsDetailOpen(true);
  };

  //검색창 현위치
  const origin = "현위치";

  //도보 상세 패널 API
  const { routeData, routeLoading, routeError, routeRefetch } = useWalkingRoute({
    startLat,
    startLng,
    endLat,
    endLng,
    isHydrated,
    accessToken,
  });

  // 마커 데이터 변환 
  const mapMarkers = useMemo<MapMarker[]>(() => {
    if (!routeData) return [];

    return [
      {
        id: "start",
        name: "출발지",
        position: { lat: startLat, lng: startLng },
        variant: "start",
      },
      {
        id: "end",
        name: endName || "도착지",
        position: { lat: endLat, lng: endLng },
        variant: "end",
      },
    ];
  }, [routeData, startLat, startLng, endLat, endLng, endName]);

  useEffect(() => console.log(routeData),[routeData]);

  if(!routeData){
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-dvh w-full overflow-hidden">
      <WalkingDirectionLayout
        header={
          <div className="relative flex items-start mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="absolute -top-8 text-[#5F5F5F] transition-all duration-200 ease-in-out active:scale-95 dark:text-white hover:opacity-60"
              aria-label="뒤로가기">
                <ChevronLeft size={24} />
            </button>

            <WaitingSpotHeader title="도보 안내" />
          </div>
        }
        search={<DirectionSearch origin={origin} destination={endName} />}
        controls={<CategoryTab selected={routeCategory} onChange={setRouteCategory} categories={routeCategories} />}
        list={<DirectionList route={routeData.route}/>}
        footer={<FooterButton onClick={onDirectionStart} content={`길 안내`}/>}
        detail={
          isDetailOpen && routeData ? <DirectionDetailPanel route={routeData.route} instructions={routeData.navigation.instructions} /> : null
        }
        onDetailBack={() => setIsDetailOpen(false)}
        map={<BaseMap
          markers={mapMarkers} />
        }
      />
    </div>
  );
}