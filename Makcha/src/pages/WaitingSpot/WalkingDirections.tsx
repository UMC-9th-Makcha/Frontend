import LoadingSpinner from "../../components/common/loadingSpinner";
import type { Direction, DirectionDetail, RouteCategoryKey,  } from "./types/walking-direction";
import { useEffect, useState } from "react";
import { WaitingSpotHeader } from "./common/WaitingSpotHeader";
import { CategoryTab } from "./common/CategoryTab";
import { DirectionList } from "./components/DirectionList";
import BaseMap from "../../components/common/Map";
import { mockCategories, mockRouteDetail } from "./common/mock";
import { WalkingDirectionLayout } from "./layouts/WalkingDirectionLayout";
import { DirectionDetailPanel } from "./panels/DirectionDetailPanel";
import { ChevronLeft } from "lucide-react";
import { FooterButton } from "./common/FooterButton";
import { routeCategories } from "./common/constants";
import { DirectionSearch } from "./components/DirectionSearch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useWalkingRoute } from "./hooks/useWalkingRoute";
import { useAuthStore } from "../../store/useAuthStore";

export default function WalkingDirections() {
  const navigate = useNavigate();

  const accessToken = useAuthStore((s) => s.accessToken);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  const [searchParams] = useSearchParams();

  const startLat = Number(searchParams.get("startLat"));
  const startLng = Number(searchParams.get("startLng"));
  const endLat = Number(searchParams.get("endLat"));
  const endLng = Number(searchParams.get("endLng"));

  //임시 데이터 저장
  const [direction, setDirection] = useState<Direction | null>(null);
  const [routeDetail,setRouteDetail] = useState<DirectionDetail | null>(null);

  const [routeCategory, setRouteCategory] = useState<RouteCategoryKey>("shortest");

  //detail 창 open, close
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const onDirectionStart = () => {
    setIsDetailOpen(true);
  };

  //지도 마커 활성화 id
  const [activeId, setActiveId] = useState<string | number | null>("start");

  useEffect(() => {
    //API
    setDirection(mockCategories[routeCategory]);
  }, [routeCategory]);

  //도보 상세 패널 API
  useEffect(() => {
    if(!isDetailOpen) return;

    const detail = mockRouteDetail[routeCategory];
    if (!detail) {
    console.warn("route detail not found");
    return;
  }
    setRouteDetail(detail);
  })

  const { routeData, routeLoading, routeError, routeRefetch } = useWalkingRoute({
    startLat,
    startLng,
    endLat,
    endLng,
    isHydrated,
    accessToken,
  });

  useEffect(() => console.log(routeData));
  if(!direction){
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
        search={<DirectionSearch origin={direction.origin.name} destination={direction.destination.name} />}
        controls={<CategoryTab selected={routeCategory} onChange={setRouteCategory} categories={routeCategories} />}
        list={<DirectionList direction={direction}/>}
        footer={<FooterButton onClick={onDirectionStart} content={`길 안내`}/>}
        detail={
          isDetailOpen && routeDetail ? <DirectionDetailPanel direction={direction} routeDetail={routeDetail} /> : null
        }
        onDetailBack={() => setIsDetailOpen(false)}
        map={<BaseMap
          markers={direction.markers}
          paths={direction.paths}
          activeId={activeId}
          onMarkerClick={(m) => setActiveId(m.id)}
        />
      }
      />
    </div>
  );
}