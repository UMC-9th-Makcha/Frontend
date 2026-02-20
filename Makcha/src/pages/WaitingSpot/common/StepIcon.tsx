import { ArrowUp,ArrowLeft,ArrowRight,PersonStanding,MapPin,Navigation } from "lucide-react";
import type { DirectionStepType } from "../types/walking-direction";

const directionMapper: Record<string, DirectionStepType> = {
  출발: "START",
  진행: "STRAIGHT",
  좌회전: "TURN_LEFT",
  우회전: "TURN_RIGHT",
  횡단보도: "CROSSWALK",
  도착: "ARRIVE",
};

export const StepIcon = ({ type }: { type: DirectionStepType }) => {
  const mappedType = directionMapper[type] ?? "STRAIGHT";
  const cls = "w-5 h-5 text-makcha-navy-600 dark:text-makcha-navy-400";

  switch (mappedType) {
    case "START":
      return <Navigation className={cls} />;
    case "STRAIGHT":
      return <ArrowUp className={cls} />;
    case "TURN_LEFT":
      return <ArrowLeft className={cls} />;
    case "TURN_RIGHT":
      return <ArrowRight className={cls} />;
    case "CROSSWALK":
      return <PersonStanding className={cls} />;
    case "ARRIVE":
      return <MapPin className={cls} />;
    default:
      return null;
  }
};
