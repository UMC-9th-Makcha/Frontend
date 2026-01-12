import { useState } from "react";
import { WaitingSpotHeader } from "../../components/waitingspot/common/WaitingSpotHeader";
import { CategoryTab } from "../../components/waitingspot/common/CategoryTab";
import { DirectionSummary } from "../../components/walking-directions/DirectionSummary";
import { DirectionList } from "../../components/walking-directions/DirectionList";
import { DirectionMap } from "../../components/walking-directions/DirectionMap";
import type { RouteCategoryKey } from "../../types/walking-direction";
import { routeCategories } from "../../components/walking-directions/constants";
import { mockDirections } from "../../components/walking-directions/mock";
import { DirectionStartButton } from "../../components/walking-directions/DirectionStartButton";
import { WalkingDirectionLayout } from "../../components/walking-directions/WalkingDirectionLayout";
import { RouteDetailPanel } from "../../components/walking-directions/RouteDetailPanel";

export default function WalkingDirections() {
  //임시 데이터 저장
  const [direction, setDirection] = useState(mockDirections);

  const [routeCategory, setRouteCategory] = useState<RouteCategoryKey>("shortest");

  //detail 창 open, close
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleStart = () => {
    setIsDetailOpen(true);
  };
  return (
    <div className="min-h-dvh w-full overflow-hidden">
      <WalkingDirectionLayout
        header={<WaitingSpotHeader title={"도보 안내"} />}
        search={<DirectionSummary origin={direction.origin.name} destination={direction.destination.name} />}
        controls={<CategoryTab selected={routeCategory} onChange={setRouteCategory} categories={routeCategories} />}
        list={<DirectionList direction={direction}/>}
        footer={<DirectionStartButton onClick={handleStart}/>}
        detail={
          isDetailOpen ? <RouteDetailPanel /> : null
        }
        onDetailBack={() => setIsDetailOpen(false)}
        map={<DirectionMap />}
      />
    </div>
  );
}