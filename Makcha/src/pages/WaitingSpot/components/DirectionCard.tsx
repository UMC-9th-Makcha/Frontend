import type { DirectionCardProps } from "../types/walking-direction";

export const DirectionCard = ({ route }: DirectionCardProps) => {
  return (
    <div className="w-90 h-35 bg-[#F3F7FF] rounded-[20px] shadow-[0_0_5px_0_#88888840] p-6">
      <div className="font-medium text-base leading-[1.2] text-makcha-navy-600 pb-1">
        <span>최단 거리</span>
      </div>
      <div className="flex gap-3">
        <div className="font-medium text-[32px] leading-[1.2] text-[#262626]">
          {route.estimatedDuration }분
        </div>
        <div className="font-normal text-[32px] leading-[1.2] text-[#262626]">
          {route.distance}m
        </div>
      </div>
      <div className="font-normal text-[16px] leading-[1.2] text-[#262626]">
        {route.transportType}
      </div>
    </div>
  )
}