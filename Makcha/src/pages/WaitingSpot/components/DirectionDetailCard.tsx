import type { DirectionDetailCardProps } from "../types/walking-direction";
import { StepIcon } from "../common/StepIcon";

export const DirectionDetailCard = ({ instruction }: DirectionDetailCardProps) => {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-white px-4 py-3 shadow-sm
      dark:bg-makcha-navy-900">

      <div className="mt-1 shrink-0">
        <StepIcon type={instruction.direction} />
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-[15px] text-gray-900 dark:text-white">
          {instruction.guidance}
        </p>

        {instruction.distance > 0 && (
          <span className="text-sm text-gray-500 dark:text-makcha-navy-400">
            {instruction.distance}m 이동
          </span>
        )}
      </div>
    </div>
  );
};
