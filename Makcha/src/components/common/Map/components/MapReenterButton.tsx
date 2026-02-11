import { memo } from "react";
import { Crosshair } from "lucide-react";

interface MapReenterButtonProps {
  onClick: () => void;
  isDarkMode: boolean; 
}

const MapReenterButton = memo(({ onClick, isDarkMode }: MapReenterButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="현위치로 이동"
      className={`
        absolute top-24 md:top-4 right-4 z-49
        flex items-center justify-center 
        rounded-lg p-2 shadow-md transition-all 
        anti-invert
        ${
          isDarkMode
            ? "bg-makcha-navy-800 text-white hover:bg-makcha-navy-700"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }
      `}
    >
      <Crosshair size={20} />
    </button>
  );
});

export default MapReenterButton;