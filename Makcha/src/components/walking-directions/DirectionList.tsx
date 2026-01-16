import type { DirectionListProps } from "../../types/walking-direction";
import { DirectionCard } from "./DirectionCard"

export const DirectionList = ({direction} : DirectionListProps) => {
  return (
      <div className="flex flex-col gap-4 mt-6">
        <DirectionCard
          key={direction.id}
          summary={direction.summary}
        />
      </div>
  );
};
