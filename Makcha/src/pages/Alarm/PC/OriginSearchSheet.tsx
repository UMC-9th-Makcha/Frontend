import { useMemo, useState } from "react";
import SearchIcon from "../../../assets/icons/Search.svg";
import MapPinIcon from "../../../assets/icons/Map pin.svg";
import { ORIGIN_SEARCH_MOCK, type OriginSearchItem } from "../mocks/originSearchMock";

type Props = {
    open: boolean;
    onClose: () => void;
    onSelectOrigin: (item: OriginSearchItem) => void;
};

const OriginSearchSheet = ({ open, onClose, onSelectOrigin }: Props) => {
    const [query, setQuery] = useState("");

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return ORIGIN_SEARCH_MOCK.filter((item) => {
            return (
                item.title.toLowerCase().includes(q) ||
                item.address.toLowerCase().includes(q)
            );
        });
    }, [query]);

    const hasQuery = query.trim().length > 0;

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
            {/* 헤더 */}
            <div className="px-5 pt-6">
                <div className="relative flex items-center justify-center">
                    <h2 className="text-center text-[20px] font-bold text-makcha-navy-900 dark:text-white">
                        출발지
                    </h2>

                    {/* 닫기 버튼 */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-0 rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
                        aria-label="닫기"
                    >
                        ✕
                    </button>
                </div>

                <div className="mt-4 border-t border-[#E2E2E2] dark:border-makcha-navy-700" />
            </div>

            {/* 검색 input */}
            <div className="mt-5 px-5">
                <div className="flex h-[42px] items-center rounded-[20px] border border-gray-200 bg-white px-4 shadow-sm">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="
                            flex-1 bg-transparent text-sm text-gray-900 outline-none
                            placeholder:text-gray-500
                            caret-gray-900
                        "
                        placeholder="지번 혹은 도로명 주소 검색"
                    />

                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        className={`mr-2 text-xs text-gray-400 ${hasQuery ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        aria-label="검색어 지우기"
                    >
                        지우기
                    </button>
                    <img src={SearchIcon} alt="검색" className="h-[21px] w-[21px] opacity-60" />
                </div>
            </div>

            {/* 검색 결과 모드 */}
            {hasQuery ? (
                <div className="mt-4">
                    <div className="px-5 pb-3 text-sm font-medium text-makcha-navy-900 dark:text-white">
                        검색 결과
                    </div>
                    <div className="mx-5 border-t border-[#E2E2E2] dark:border-makcha-navy-700" />

                    <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
                        {results.length === 0 ? (
                            <div className="px-5 py-8 text-center text-sm text-gray-500 dark:text-white/40">
                                검색 결과가 없습니다.
                            </div>
                        ) : (
                            <ul className="py-2">
                                {results.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onSelectOrigin(item);
                                                onClose();
                                            }}
                                            className="w-full px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-white/5"
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
                /* 기본 모드 (현위치/주소록) */
                <>
                    <div className="mt-[18px]">
                        <button
                            type="button"
                            className="flex w-full items-center gap-2 px-5 py-4 text-sm text-gray-700 dark:text-white/80"
                            onClick={() => {
                                // 현위치 mock 처리: 필요 시 여기서도 onSelectOrigin 호출 가능
                            }}
                        >
                            <img
                                src={MapPinIcon}
                                alt="현위치"
                                className="h-[17px] w-[17px] opacity-70 dark:opacity-80"
                            />
                            <span>현위치</span>
                        </button>

                        <div className="mx-5 border-t border-[#E2E2E2] dark:border-makcha-navy-700" />
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

                    <div className="px-5 py-20 text-center text-sm text-gray-500 dark:text-white/40">
                        최근에 선택한 주소가 없습니다.
                    </div>
                </>
            )}
        </div>
    );
};

export default OriginSearchSheet;
