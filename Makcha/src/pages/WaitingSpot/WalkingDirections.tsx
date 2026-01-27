import { useEffect, useState } from "react";
import { WaitingSpotHeader } from "../../components/waitingspot/common/WaitingSpotHeader";
import { CategoryTab } from "../../components/waitingspot/common/CategoryTab";
import { DirectionSummary } from "../../components/walking-directions/DirectionSummary";
import { DirectionList } from "../../components/walking-directions/DirectionList";
import { DirectionMap } from "../../components/walking-directions/DirectionMap";
import type { Direction, RouteCategoryKey, RouteDetail } from "../../types/walking-direction";
import { routeCategories } from "../../components/walking-directions/constants";
import { mockCategories, mockRouteDetail } from "../../components/waitingspot/common/mock";
import { DirectionStartButton } from "../../components/walking-directions/DirectionStartButton";
import { WalkingDirectionLayout } from "../../components/walking-directions/WalkingDirectionLayout";
import { RouteDetailPanel } from "../../components/walking-directions/RouteDetailPanel";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "../../components/common/loadingSpinner";

type WalkingDirectionsProps = {
  onBack?: () => void;
};

export default function WalkingDirections({onBack}: WalkingDirectionsProps) {
  //임시 데이터 저장
  const [direction, setDirection] = useState<Direction | null>(null);
  const [routeDetail,setRouteDetail] = useState<RouteDetail | null>(null);

  const [routeCategory, setRouteCategory] = useState<RouteCategoryKey>("shortest");

  //detail 창 open, close
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleStart = () => {
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

  if(!direction){
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-dvh w-full overflow-hidden">
      <WalkingDirectionLayout
        header={
          <div className="relative flex items-start gap-2">
            <button
              type="button"
              onClick={onBack}
              className="absolute -top-8 text-[#5F5F5F]"
              aria-label="뒤로가기">
              <ArrowLeft className="w-5 h-5" />
            </button>

            <WaitingSpotHeader title="도보 안내" />
          </div>
        }
        search={<DirectionSummary origin={direction.origin.name} destination={direction.destination.name} />}
        controls={<CategoryTab selected={routeCategory} onChange={setRouteCategory} categories={routeCategories} />}
        list={<DirectionList direction={direction}/>}
        footer={<DirectionStartButton onClick={handleStart}/>}
        detail={
          isDetailOpen && routeDetail ? <RouteDetailPanel direction={direction} routeDetail={routeDetail} /> : null
        }
        onDetailBack={() => setIsDetailOpen(false)}
        map={<DirectionMap
          markers={direction.markers}
          paths={direction.paths}
          activeId={activeId}
          onMarkerClick={(m) => setActiveId(m.id)}
        />}
      />
    </div>
  );
}