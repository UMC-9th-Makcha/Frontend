import type { CategoryTabProps } from "../types/waitingspot";

export const CategoryTab = <T extends string>({ selected, onChange, categories }: CategoryTabProps<T>) => {
  return (
    <div className="flex rounded-lg gap-2 py-4 px-2 whitespace-nowrap">
      {categories.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={() => onChange(c.key)}
          className={`h-9 px-4 text-sm font-extralight border border-gray-200 rounded-[20px] shadow-sm transition 
            dark:text-makcha-navy-200 dark:bg-makcha-navy-800 dark:border-makcha-navy-600
            ${selected === c.key
              ? "text-makcha-navy-600 bg-[#F3F7FF] border-makcha-navy-400 border-[0.5px]"
              : "bg-white text-gray-600"
            }`}>
          {c.label}
        </button>
      ))}
    </div>
  );
};
