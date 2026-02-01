import type { DirectionCardProps } from "../../../types/walking-direction";
import { routeCategories } from "../common/constants";

export const DirectionCard = ({ summary }: DirectionCardProps) => {
  const getRouteCategoryLabel = (key: string) =>
  routeCategories.find((v) => v.key === key)?.label;

  return (
    <div className="w-90 h-35 bg-[#F3F7FF] rounded-[20px] shadow-[0_0_5px_0_#88888840] p-6">
      <div className="font-medium text-base leading-[1.2] text-makcha-navy-600 pb-1">
        {getRouteCategoryLabel(summary.category)}
      </div>
      <div className="flex gap-3">
        <div className="font-medium text-[32px] leading-[1.2] text-[#262626]">
          {Math.ceil(summary.durationSeconds / 60)}분
        </div>
        <div className="font-normal text-[32px] leading-[1.2] text-[#262626]">
          {summary.distanceMeters}m
        </div>
      </div>
      <div className="font-normal text-[16px] leading-[1.2] text-[#262626]">
        횡단보도 {summary.crosswalkCount}회
      </div>
    </div>
  )
}