import { MapPin, Search } from "lucide-react";
import type { OriginSearchItem } from "../../types/search";
import SubPanel from "../../../../components/common/Panel/SubPanel";

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    onSelect: (item: OriginSearchItem) => void;
    onPickCurrent: () => void;
    query: string;
    setQuery: (v: string) => void;
    results: OriginSearchItem[];
    hasQuery: boolean;
};

const SearchSheetPC = ({
    open,
    onClose,
    title,
    onSelect,
    onPickCurrent,
    query,
    setQuery,
    results,
    hasQuery,
}: Props) => {
    return (
        <div
            className={`
                absolute left-102 top-[26px] bottom-[26px] z-50 w-100
                ${open ? "translate-x-0" : "translate-x-100 pointer-events-none opacity-0"}
                ${open ? "transition-none" : "transition-transform transition-opacity duration-300"}
            `}
            aria-hidden={!open}
        >
            <SubPanel
                isOpen={open}
                onBack={onClose}
                title={title}
                width="w-full"
                className="
                    md:ml-0
                    h-full
                    md:rounded-6
                    shadow-[0_0_15px_rgba(136,136,136,0.35)]
                    border border-gray-200 dark:border-makcha-navy-800
                "
            >
                {/* 검색 input */}
                <div className="mt-0">
                    <div className="flex h-11 items-center rounded-[20px] border border-gray-200 bg-white px-4 shadow-sm dark:bg-makcha-navy-900">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="지번 혹은 도로명 주소 검색"
                            className="
                                flex-1 bg-transparent text-sm text-gray-900 outline-none
                                placeholder:text-gray-500 caret-gray-900
                                dark:text-white dark:placeholder:text-white/40
                            "
                        />

                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className={`mr-2 text-xs text-gray-400 ${hasQuery ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                            aria-label="검색어 지우기"
                        >
                            지우기
                        </button>

                        <Search className="h-5 w-5 text-[#5F5F5F] dark:text-white/60" strokeWidth={2} />
                    </div>
                </div>

                {/* 검색 결과 */}
                {hasQuery ? (
                    <div className="mt-4">
                        <div className="pb-3 text-sm font-medium text-makcha-navy-900 dark:text-white">
                            검색 결과
                        </div>
                        <div className="border-t border-[#E2E2E2]" />

                        <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
                            {results.length === 0 ? (
                                <div className="py-8 text-center text-sm text-gray-500 dark:text-white/40">
                                    검색 결과가 없습니다.
                                </div>
                            ) : (
                                <ul className="py-2">
                                    {results.map((item) => (
                                        <li key={item.id}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onSelect(item);
                                                    onClose();
                                                }}
                                                className="w-full py-4 text-left hover:bg-gray-50 dark:hover:bg-white/5"
                                            >
                                                <div className="text-[14px] font-semibold text-makcha-navy-900 dark:text-white">
                                                    {item.title}
                                                </div>
                                                <div className="mt-1 text-[12px] text-gray-500 dark:text-white/50">
                                                    {item.address}
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* 현위치 */}
                        <div className="mt-4">
                            <button
                                type="button"
                                className="flex w-full items-center gap-1.5 py-4 text-sm text-gray-700 dark:text-white/80"
                                onClick={onPickCurrent}
                            >
                                <MapPin className="h-5 w-5 text-gray-700 dark:text-white/70" strokeWidth={1.5} />
                                <span>현위치</span>
                            </button>

                            <div className="border-t border-[#E2E2E2]" />
                        </div>

                        {/* 주소록 */}
                        <div className="pt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-makcha-navy-900 dark:text-white">주소록</span>
                                <button type="button" className="text-sm text-makcha-navy-900 dark:text-white">
                                    전체보기
                                </button>
                            </div>
                        </div>

                        <div className="py-20 text-center text-sm text-gray-500 dark:text-white/40">
                            최근에 선택한 주소가 없습니다.
                        </div>
                    </>
                )}
            </SubPanel>
        </div>
    );
};

export default SearchSheetPC;