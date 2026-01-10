import { useState } from "react";
import { WaitingSpotLayout } from "../../components/waitingspot/common/WaitingSpotLayout";
import { WaitingSpotHeader } from "../../components/waitingspot/common/WaitingSpotHeader";
import { CategoryTab } from "../../components/waitingspot/common/CategoryTab";
import { DirectionSummary } from "../../components/walking-directions/DirectionSummary";
import { DirectionList } from "../../components/walking-directions/DirectionList";
import { DirectionMap } from "../../components/walking-directions/DirectionMap";
import type { RouteCategoryKey } from "../../types/walking-direction";
import { routeCategories } from "../../components/walking-directions/constants";
import { mockDirections } from "../../components/walking-directions/mock";
import { DirectionStartButton } from "../../components/walking-directions/DirectionStartButton";

export default function WalkingDirections() {
  const [routeCategory, setRouteCategory] = useState<RouteCategoryKey>("shortest");

  return (
    <div className="min-h-dvh w-full overflow-hidden">
      <WaitingSpotLayout
        header={<WaitingSpotHeader title={"도보 안내"} />}
        search={<DirectionSummary origin={mockDirections.origin.name} destination={mockDirections.destination.name} />}
        controls={<CategoryTab selected={routeCategory} onChange={setRouteCategory} categories={routeCategories} />}
        list={<DirectionList direction={mockDirections}/>}
        footer={<DirectionStartButton />}
        map={<DirectionMap />}
      />
    </div>
  );
}