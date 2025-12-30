import SearchIcon from "../../../assets/icons/Search.svg";

type OriginFieldProps = {
    onClick: () => void;
};

const OriginField = ({ onClick }: OriginFieldProps) => {
    return (
        <div className="mt-6 space-y-2">
            <p className="text-sm font-semibold text-makcha-navy-900 dark:text-white">출발지</p>

            <button
                type="button"
                onClick={onClick}
                className="flex h-[42px] w-full items-center gap-3 rounded-[20px] border border-gray-200 bg-white pl-[16px] pr-[15px] shadow-sm"
            >
                <span className="relative h-4 w-4">
                    <span className="absolute inset-0 rounded-full bg-makcha-navy-400 opacity-60 blur-[4px]" />
                    <span className="absolute inset-1 rounded-full bg-makcha-navy-600" />
                </span>

                <p className="flex-1 truncate text-left text-sm text-gray-600">
                    현위치 : 서울역 봉구비어
                </p>

                <img src={SearchIcon} alt="검색" className="h-5 w-5 opacity-60" />
            </button>
        </div>
    );
};

export default OriginField;
