import type { DirectionListProps } from "../types/walking-direction";
import { DirectionCard } from "./DirectionCard"

export const DirectionList = ({ route } : DirectionListProps) => {
  return (
      <div className="flex flex-col gap-4 mt-6">
        <DirectionCard
          route={route}
        />
      </div>
  );
};
