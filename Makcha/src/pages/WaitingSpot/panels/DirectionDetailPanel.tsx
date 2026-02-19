import type { DirectionDetailPanelProps } from "../types/walking-direction";
import { DirectionDetailCard } from "../components/DirectionDetailCard";
import LoadingSpinner from "../../../components/common/loadingSpinner";

export const DirectionDetailPanel = ({ route, instructions, isUpdating }: DirectionDetailPanelProps) => {

  return (
    <div className="flex flex-col h-full">
      <div className="pb-4">
        <div className="font-medium text-base text-makcha-navy-600 pt-1 dark:text-makcha-navy-400">
          <span>최단 거리</span>
        </div>
        <div className="flex gap-3">
          <div className="text-3xl text-gray-700 dark:text-makcha-navy-200">
            {Math.ceil(route.estimatedDuration)}분
          </div>
          <div className="text-3xl text-gray-700 dark:text-makcha-navy-200">
            {route.distance}m
          </div>
        </div>
        <div className="font-normal text-sm text-gray-500 dark:text-gray-400">
          {route.transportType}
        </div>
      </div>
      <hr className="text-gray-200 -mx-4 dark:text-makcha-navy-800" />

      {/* 스크롤 영역 */}
      <div className="flex flex-col gap-2 mt-4">
        {isUpdating ? (
          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
            <LoadingSpinner />
            <span className="ml-3 text-sm">경로를 업데이트 중입니다…</span>
          </div>
        ) : (instructions.map((instruction) => (
          <DirectionDetailCard key={instruction.step} instruction={instruction} />
        )))
        }
      </div>
    </div>
  );
};
