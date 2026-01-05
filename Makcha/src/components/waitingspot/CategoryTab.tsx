import type { CategoryTabProps } from "../../types/waitingspot";
import { categories } from "./constants";

export const CategoryTab = ({ selected, onChange }: CategoryTabProps) => {
  return (
    <div className="flex rounded-lg gap-2">
      {categories.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={() => onChange(c.key)}
          className={`h-9 px-4 text-sm rounded-[20px] shadow-[0_0_5px_0_#88888840] transition 
            dark:text-makcha-navy-200 dark:bg-makcha-navy-800 dark:border-makcha-navy-600
            ${selected === c.key
              ? "text-makcha-navy-600 bg-[#F3F7FF] border border-makcha-navy-400 border-[0.5px]"
              : "bg-white text-[#5F5F5F] font-medium"
            }`}>
          {c.label}
        </button>
      ))}
    </div>
  );
};
