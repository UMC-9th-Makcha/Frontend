import type { RouteDetailPanelProps } from "../../types/walking-direction";
import { routeCategories } from "./constants";
import { RouteDetailCard } from "./RouteDetailCard";

export const RouteDetailPanel = ({ direction, routeDetail }: RouteDetailPanelProps) => {
  const getRouteCategoryLabel = (key: string) =>
    routeCategories.find((v) => v.key === key)?.label;

  const steps = routeDetail?.steps ?? [];

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
      <div className="flex flex-col gap-2 mt-4">
        {steps.map((step) => (
          <RouteDetailCard key={step.order} step={step} />
        ))}
      </div>
    </div>
  );
};
