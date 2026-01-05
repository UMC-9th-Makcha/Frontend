import type { Place } from "../../types/waitingspot";

export type PlaceDetailProps = {
  place : Place | null;
  onClose: () => void;
}
export const PlaceDetail = ({place, onClose} : PlaceDetailProps) => {
  if (!place) return null;
  
  return (
    <div className="w-[402px] h-[961px] bg-white rounded-[20px]"></div>
  )
}
