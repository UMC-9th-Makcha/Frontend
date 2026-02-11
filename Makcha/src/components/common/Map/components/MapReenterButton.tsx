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
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label="현위치로 이동"
      className={`
        absolute z-9999 top-24 md:top-4 right-4 md:right-6

        flex items-center justify-center  w-11 h-11 rounded-full 
        shadow-lg md:shadow-md anti-invert
        transition-all duration-200 active:scale-90 cursor-pointer pointer-events-auto

        ${
          isDarkMode
            ? "bg-makcha-navy-800 text-white border border-makcha-navy-700 hover:bg-makcha-navy-700 shadow-black/40"
            : "bg-white text-gray-700 border border-gray-100 hover:bg-gray-50 shadow-gray-300/50"
        }
      `}
    >
      <Crosshair size={22} strokeWidth={2.2} />
    </button>
  );
});

export default MapReenterButton;