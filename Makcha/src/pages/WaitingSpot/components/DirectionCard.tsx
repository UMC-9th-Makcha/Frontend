import type { DirectionCardProps } from "../types/walking-direction";

export const DirectionCard = ({ route }: DirectionCardProps) => {
  return (
    <div className="w-full h-35 bg-[#F3F7FF] rounded-[20px] border border-makcha-navy-200 shadow-sm p-6">
      <div className="font-medium text-base leading-[1.2] text-makcha-navy-600 pb-1">
        <span>최단 거리</span>
      </div>
      <div className="flex gap-3">
        <div className="text-3xl leading-[1.2] text-gray-800">
          {route.estimatedDuration }분
        </div>
        <div className="text-3xl leading-[1.2] text-gray-800">
          {route.distance}m
        </div>
      </div>
      <div className="text-base leading-[1.2] text-gray-600">
        {route.transportType}
      </div>
    </div>
  )
}