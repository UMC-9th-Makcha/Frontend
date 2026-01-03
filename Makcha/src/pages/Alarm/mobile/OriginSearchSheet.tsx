import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SearchIcon from "../../../assets/icons/Search.svg";
import MapPinIcon from "../../../assets/icons/Map pin.svg";
import CloseIcon from "../../../assets/icons/close.svg";
import {
    ORIGIN_SEARCH_MOCK,
    type OriginSearchItem,
} from "../mocks/originSearchMock";

type Props = {
    open: boolean;
    onClose: () => void;
    onSelectOrigin: (item: OriginSearchItem) => void;
};

const OriginSearchSheetMobile = ({ open, onClose, onSelectOrigin }: Props) => {
    const [query, setQuery] = useState("");
    const mainRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!open) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {
            mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
        });

        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [open]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return ORIGIN_SEARCH_MOCK.filter(
            (item) =>
                item.title.toLowerCase().includes(q) ||
                item.address.toLowerCase().includes(q)
        );
    }, [query]);

    const hasQuery = query.trim().length > 0;

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] h-[100dvh] w-[100vw] overflow-hidden overscroll-contain flex flex-col bg-white dark:bg-makcha-navy-900">
            {/* 헤더 */}
            <header className="dark:bg-makcha-navy-900 sticky top-0 z-10 bg-white dark:bg-makcha-navy-950 px-5 pt-[env(safe-area-inset-top)]">
                <div className="pt-4 pb-4">
                    <div className="relative flex items-center justify-center">
                        <h2 className="text-center text-[40px] font-normal text-makcha-navy-900 dark:text-white">
                            출발지
                        </h2>

                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"
                            aria-label="닫기"
                        >
                            <img
                                src={CloseIcon}
                                alt=""
                                className="h-[32px] w-[32px] opacity-70 dark:opacity-80"
                            />
                        </button>
                    </div>
                </div>

                <div className="border-t border-black dark:border-makcha-navy-800" />
            </header>

            <main
                ref={mainRef}
                className="min-h-0 flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]"
            >
                {/* 검색 input */}
                <div className="mt-[37px] px-5">
                    <div className="flex h-[62px] items-center rounded-[10px] border border-[#6D6D6D] bg-white px-4 shadow-sm">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="지번 혹은 도로명으로 주소 검색"
                            className="
                                flex-1 bg-transparent text-[25px] text-[#6D6D6D] outline-none
                                placeholder:text-gray-500 caret-gray-900
                            "
                        />

                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className={`mr-2 text-[16px] text-gray-400 ${hasQuery ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                            aria-label="검색어 지우기"
                        >
                            지우기
                        </button>

                        <img
                            src={SearchIcon}
                            alt="검색"
                            className="h-[32px] w-[32px] opacity-60 dark:opacity-80"
                        />
                    </div>
                </div>

                {/* 검색 결과 */}
                {hasQuery ? (
                    <div className="mt-4">
                        <div className="px-5 pb-3 text-[20px] font-medium text-makcha-navy-900 dark:text-white">
                            검색 결과
                        </div>
                        <div className="mx-5 border-t border-[#E2E2E2] dark:border-makcha-navy-800" />

                        {results.length === 0 ? (
                            <div className="px-5 py-10 text-center text-[20px] text-gray-500 dark:text-white/40">
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
                                            className="w-full px-5 py-4 text-left active:bg-gray-50 dark:active:bg-white/5"
                                        >
                                            <div className="text-[20px] font-semibold text-makcha-navy-900 dark:text-white">
                                                {item.title}
                                            </div>
                                            <div className="mt-1 text-[15px] text-gray-500 dark:text-white/50">
                                                {item.address}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    <>
                        {/* 현위치 */}
                        <div className="mt-[37px]">
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-2 px-5 py-4 text-[20px] text-black dark:text-white/80"
                            >
                                <img
                                    src={MapPinIcon}
                                    alt="현위치"
                                    className="h-[20px] w-[20px] opacity-70 dark:opacity-80"
                                />
                                <span>현위치</span>
                            </button>

                            <div className="mx-5 border-t border-black dark:border-makcha-navy-800" />
                        </div>

                        {/* 주소록 */}
                        <div className="pt-4">
                            <div className="flex items-center justify-between px-5">
                                <span className="text-[20px] text-makcha-navy-900 dark:text-white">
                                    주소록
                                </span>
                                <button
                                    type="button"
                                    className="text-[20px] text-makcha-navy-900 dark:text-white"
                                >
                                    전체보기
                                </button>
                            </div>
                        </div>

                        {/* 최근 주소 없음 상태 */}
                        <div className="px-7 py-[240px] text-center text-[25px] text-black dark:text-white/40">
                            최근에 선택한 주소가 없습니다.
                        </div>
                    </>
                )}
            </main>
        </div>,
        document.body
    );
};

export default OriginSearchSheetMobile;
