import SearchIcon from "../../../assets/icons/Search.svg";
import MapPinIcon from "../../../assets/icons/Map pin.svg";

type Props = {
    open: boolean;
    onClose: () => void;
};

const OriginSearchSheet = ({ open }: Props) => {
    return (
        <div
            className={`
                absolute left-[428px] top-[35px] bottom-[35px] z-50
                w-[402px]
                rounded-[24px]
                bg-white dark:bg-makcha-navy-900
                border-r border-gray-200 dark:border-makcha-navy-800
                shadow-[0_0_15px_rgba(136,136,136,0.35)]
                ${open ? "translate-x-0" : "translate-x-[402px] pointer-events-none opacity-0"}
                ${open ? "transition-none" : "transition-transform transition-opacity duration-300"}
            `}
            aria-hidden={!open}
        >
            <div className="px-5 pt-6">
                <h2 className="text-center text-[20px] font-bold text-makcha-navy-900 dark:text-white">
                    출발지
                </h2>
            </div>

            {/* 검색 input */}
            <div className="mt-5 px-5">
                <div className="flex h-[42px] items-center rounded-[20px] border border-gray-200 bg-white px-4 shadow-sm">
                    <input
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                        placeholder="지번 혹은 도로명 주소 검색"
                    />
                    <img src={SearchIcon} alt="검색" className="h-[21px] w-[21px] opacity-60" />
                </div>
            </div>

            <div className="mt-[18px]">
                <button
                    type="button"
                    className="flex w-full items-center gap-2 px-5 py-4 text-sm text-gray-700 dark:text-white/80"
                >
                    <img
                        src={MapPinIcon}
                        alt="현위치"
                        className="h-[17px] w-[17px] opacity-70 dark:opacity-80"
                    />
                    <span>현위치</span>
                </button>

                <div className="mx-5 border-t border-[#E2E2E2]" />
            </div>

            <div className="pt-4">
                <div className="flex items-center justify-between px-5">
                    <span className="text-sm text-makcha-navy-900 dark:text-white">
                        주소록
                    </span>
                    <button
                        type="button"
                        className="text-sm text-makcha-navy-900 dark:text-white"
                    >
                        전체보기
                    </button>
                </div>
            </div>

            {/* 내용 영역 */}
            <div className="px-5 py-20 text-center text-sm text-gray-500 dark:text-white/40">
                최근에 선택한 주소가 없습니다.
            </div>
        </div>
    );
};

export default OriginSearchSheet;
