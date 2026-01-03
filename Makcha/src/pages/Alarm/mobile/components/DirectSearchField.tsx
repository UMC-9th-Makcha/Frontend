import SearchIcon from "../../../../assets/icons/Search.svg";

type Props = {
    onClick?: () => void;
};

const DirectSearchField = ({ onClick }: Props) => {
    return (
        <div className="mt-7 space-y-2">
            <p className="text-[20px] font-medium text-[#262626] dark:text-white">
                직접 검색하기
            </p>

            <button
                type="button"
                onClick={onClick}
                className="
                    flex h-[57px] w-full items-center gap-3
                    rounded-[20px]
                    border border-gray-200 dark:border-makcha-navy-700
                    bg-white 
                    pl-[14px] pr-[14px]
                    shadow-sm
                    "
                >
                <span className="relative ml-[10px] h-4 w-4 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-makcha-navy-400 opacity-60 blur-[4px]" />
                    <span className="absolute inset-1 rounded-full bg-makcha-navy-600" />
                </span>

                <p className="min-w-0 flex-1 truncate text-left text-[18px] text-[#5F5F5F]">
                    도착지
                </p>

                <img src={SearchIcon} alt="검색" className="h-[29px] w-[29px] opacity-60" />
            </button>
        </div>
    );
};

export default DirectSearchField;
