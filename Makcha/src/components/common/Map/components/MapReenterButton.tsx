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
      className={`
        fixed z-10
        bottom-40 md:top-4 left-6 md:right-4 md:bottom-auto md:left-auto
        flex items-center justify-center w-12 h-12 rounded-full 
        shadow-2xl transition-all active:scale-90
        cursor-pointer pointer-events-auto touch-none
        ${isDarkMode ? "bg-makcha-navy-800 text-white" : "bg-white text-gray-700"}
      `}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    >
      <Crosshair size={24} strokeWidth={2.5} />
    </button>
  );
});

export default MapReenterButton;