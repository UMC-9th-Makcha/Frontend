import type { RouteDetailPanelProps } from "../../types/walking-direction";
import { routeCategories } from "./constants";

export const RouteDetailPanel = ({ direction }: RouteDetailPanelProps) => {
  const getRouteCategoryLabel = (key: string) =>
    routeCategories.find((v) => v.key === key)?.label;
  return (
    <div className="flex flex-col h-full">
      <div className="pb-4">
        <div className="font-medium text-base leading-[1.2] text-makcha-navy-600 pb-1">
        {getRouteCategoryLabel(direction.summary.category)}
      </div>
      <div className="flex gap-3">
        <div className="font-medium text-[32px] leading-[1.2] text-[#262626]">
          {Math.ceil(direction.summary.durationSeconds / 60)}분
        </div>
        <div className="font-normal text-[32px] leading-[1.2] text-[#262626]">
          {direction.summary.distanceMeters}m
        </div>
      </div>
      <div className="font-normal text-[16px] leading-[1.2] text-[#262626]">
        횡단보도 {direction.summary.crosswalkCount}회
      </div>
      </div>
      <hr className="text-[#E2E2E2] -mx-4" />
      <div></div>
    </div>
  );
};
