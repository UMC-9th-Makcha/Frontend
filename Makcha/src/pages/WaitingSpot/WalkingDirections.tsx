import { useState } from "react";
import { WaitingSpotLayout } from "../../components/waitingspot/common/WaitingSpotLayout";
import { WaitingSpotHeader } from "../../components/waitingspot/common/WaitingSpotHeader";
import { CategoryTab } from "../../components/waitingspot/common/CategoryTab";
import { DirectionSummary } from "../../components/walking-directions/DirectionSummary";
import { DirectionList } from "../../components/walking-directions/DirectionList";
import { DirectionMap } from "../../components/walking-directions/DirectionMap";
import type { RouteCategoryKey } from "../../types/walking-direction";
import { routeCategories } from "../../components/walking-directions/constants";

export default function WalkingDirections() {
  const [routeCategory, setRouteCategory] = useState<RouteCategoryKey>("shortest");

  return (
    <div className="h-full min-h-0 min-w-0">
      <WaitingSpotLayout
        header={<WaitingSpotHeader title={"도보 안내"} />}
        search={<DirectionSummary />}
        controls={<CategoryTab selected={routeCategory} onChange={setRouteCategory} categories={routeCategories} />}
        list={<DirectionList />}
        map={<DirectionMap />}
      />
    </div>
  );
}