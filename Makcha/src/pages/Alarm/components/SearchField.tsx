import { Search } from "lucide-react";

type Props = {
  label: string;
  text: string;
  onClick: () => void;
};

const SearchField = ({ label, text, onClick }: Props) => {
  return (
    <div className="mt-6 space-y-2">
      <p className="text-sm font-semibold text-makcha-navy-900 dark:text-white max-md:text-[20px] max-md:font-medium max-md:text-[#262626]">
        {label}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="
          flex w-full items-center gap-3
          rounded-[30px]
          border border-gray-200
          bg-white
          shadow-sm
          h-[42px] pl-[16px] pr-[15px]
          dark:border-makcha-navy-700 dark:bg-makcha-navy-900
          max-md:h-[57px] max-md:pl-[14px] max-md:pr-[14px]
        "
      >
        
        <span className="relative h-4 w-4 max-md:ml-[10px] shrink-0" aria-hidden="true">
          <span className="absolute inset-0 rounded-full bg-makcha-navy-400 opacity-60 blur-[4px]" />
          <span className="absolute inset-1 rounded-full bg-makcha-navy-600" />
        </span>


        <span className="flex-1 truncate text-left text-sm text-gray-600 dark:text-white/80 max-md:text-[18px] max-md:text-[#5F5F5F]">
          {text}
        </span>

        <Search
          className="h-5 w-5 text-gray-400 dark:text-white/60 max-md:h-[29px] max-md:w-[29px]"
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export default SearchField;
