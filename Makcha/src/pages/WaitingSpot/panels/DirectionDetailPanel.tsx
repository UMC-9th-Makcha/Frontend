import type { DirectionDetailPanelProps } from "../types/walking-direction";
import { DirectionDetailCard } from "../components/DirectionDetailCard";

export const DirectionDetailPanel = ({ route, instructions }: DirectionDetailPanelProps) => {

  return (
    <div className="flex flex-col h-full">
      <div className="pb-4">
        <div className="font-medium text-base leading-[1.2] text-makcha-navy-600 pb-1">
          <span>최단 거리</span>
        </div>
        <div className="flex gap-3">
          <div className="font-medium text-[32px] leading-[1.2] text-[#262626]">
            {Math.ceil(route.estimatedDuration)}분
          </div>
          <div className="font-normal text-[32px] leading-[1.2] text-[#262626]">
            {route.distance}m
          </div>
        </div>
        <div className="font-normal text-[16px] leading-[1.2] text-[#262626]">
          {route.transportType}
        </div>
      </div>
      <hr className="text-[#E2E2E2] -mx-4" />

      {/* 스크롤 영역 */}
      <div className="flex flex-col gap-2 mt-4">
        {instructions.map((instruction) => (
          <DirectionDetailCard key={instruction.step} instruction={instruction} />
        ))}
      </div>
    </div>
  );
};
