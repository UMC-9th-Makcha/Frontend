import { ArrowUp,ArrowLeft,ArrowRight,PersonStanding,MapPin,Navigation } from "lucide-react";
import type { DirectionStepType } from "../../../types/walking-direction";

export const StepIcon = ({ type }: { type: DirectionStepType }) => {
  const cls = "w-5 h-5 text-makcha-navy-600";

  switch (type) {
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
