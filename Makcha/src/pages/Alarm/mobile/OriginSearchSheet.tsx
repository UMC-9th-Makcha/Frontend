import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MapPin, Search, X } from "lucide-react";
import type { OriginSearchItem } from "../mocks/originSearchMock";

type Props = {
    open: boolean;
    onClose: () => void;
    onSelectOrigin: (item: OriginSearchItem) => void;

    query: string;
    setQuery: (v: string) => void;
    results: OriginSearchItem[];
    hasQuery: boolean;
};

const OriginSearchSheetMobile = ({
    open,
    onClose,
    onSelectOrigin,
    query,
    setQuery,
    results,
    hasQuery,
}: Props) => {
    const mobileMainRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!open) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {
            mobileMainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
        });

        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] h-dvh w-screen overflow-hidden overscroll-contain flex flex-col bg-white dark:bg-makcha-navy-900">
            {/* 헤더 */}
            <header className="sticky top-0 z-10 bg-white dark:bg-makcha-navy-900 px-5 pt-[env(safe-area-inset-top)]">
                <div className="pt-4 pb-4">
                    <div className="relative flex items-center justify-center">
                        <h2 className="text-center text-[40px] font-normal text-makcha-navy-900 dark:text-white">
                            출발지
                        </h2>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="닫기"
                            className="
                                absolute right-0
                                rounded-lg p-2
                                text-gray-500
                                hover:bg-gray-100
                                dark:hover:bg-white/10
                            "
                        >
                            <X className="h-7 w-7" strokeWidth={2} />
                        </button>
                    </div>
                </div>

                <div className="border-t border-[#E2E2E2]" />
            </header>

            <main
                ref={mobileMainRef}
                className="min-h-0 flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]"
            >
                {/* 검색 input */}
                <div className="mt-[37px] px-5">
                    <div
                        className="
                            flex h-[62px] items-center
                            rounded-[30px]
                            border border-gray-200
                            bg-white px-4 shadow-sm
                            dark:bg-makcha-navy-900
                            "
                    >
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="지번 혹은 도로명 주소 검색"
                            className="
                                flex-1 bg-transparent
                                text-[24px] text-gray-900 outline-none
                                placeholder:text-gray-500 caret-gray-900
                                dark:text-white dark:placeholder:text-white/40
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

                        <Search className="h-8 w-8 text-[#5F5F5F] dark:text-white/60" strokeWidth={2} />
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
                                className="flex w-full items-center gap-1.5 px-5 py-4 text-[20px] text-gray-700 dark:text-white/80"
                            >
                                <MapPin className="h-5 w-5 text-gray-700 dark:text-white/70" strokeWidth={1.5} />
                                <span>현위치</span>
                            </button>

                            <div className="mx-5 border-t border-[#E2E2E2]" />
                        </div>

                        {/* 주소록 */}
                        <div className="pt-4">
                            <div className="flex items-center justify-between px-5">
                                <span className="text-[20px] text-makcha-navy-900 dark:text-white">주소록</span>
                                <button type="button" className="text-[20px] text-makcha-navy-900 dark:text-white">
                                    전체보기
                                </button>
                            </div>
                        </div>

                        {/* 최근 주소 없음 */}
                        <div className="px-7 py-[240px] text-center text-[25px] text-gray-500 dark:text-white/40">
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
