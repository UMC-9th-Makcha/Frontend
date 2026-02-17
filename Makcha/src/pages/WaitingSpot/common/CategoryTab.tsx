import type { CategoryTabProps } from "../types/waitingspot";

export const CategoryTab = <T extends string>({ selected, onChange, categories }: CategoryTabProps<T>) => {
  return (
    <div className="flex rounded-lg gap-2 py-4 px-2 whitespace-nowrap">
      {categories.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={() => onChange(c.key)}
          className={`h-9 px-4 text-sm font-extralight rounded-[20px] shadow-sm transition
            ${selected === c.key
              ? "border bg-[#F3F7FF] text-makcha-navy-600 border-makcha-navy-400 dark:bg-makcha-navy-600 dark:text-white"
              : "border bg-white text-gray-600 border-gray-200 hover:border-gray-400 dark:border-makcha-navy-600 dark:bg-makcha-navy-900 dark:text-makcha-navy-400"
            }`}>
          {c.label}
        </button>
      ))}
    </div>
  );
};
