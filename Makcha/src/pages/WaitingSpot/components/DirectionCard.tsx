import type { DirectionCardProps } from "../types/walking-direction";

export const DirectionCard = ({ route }: DirectionCardProps) => {
  return (
    <div className="w-full h-35 bg-[#F3F7FF] rounded-[20px] border border-makcha-navy-200 shadow-sm p-6 dark:bg-makcha-navy-900">
      <div className="font-medium text-base text-makcha-navy-600 pb-1 dark:text-makcha-navy-400">
        <span>최단 거리</span>
      </div>
      <div className="flex gap-3">
        <div className="text-3xl text-gray-800 dark:text-makcha-navy-200">
          {route.estimatedDuration }분
        </div>
        <div className="text-3xl text-gray-800 dark:text-makcha-navy-200">
          {route.distance}m
        </div>
      </div>
      <div className="text-base text-gray-600 dark:text-gray-300">
        {route.transportType}
      </div>
    </div>
  )
}