import { X } from "lucide-react";
import { useMemo } from "react";
import type { OriginSearchItem } from "../types/search";
import { HorizontalScroll } from "../../../components/common/HorizontalScroll";
import { useRecentDestinations } from "../hooks/useRecentDestinations";
import { useDeleteRecentDestination } from "../hooks/useDeleteRecentDestination";
import type { RecentDestinationDto } from "../apis/recentDestinations";

type Props = {
    onSelectDestination: (item: OriginSearchItem) => void;
};

const RecentDestinations = ({ onSelectDestination }: Props) => {
    const { data, isLoading } = useRecentDestinations(10);
    const uniqueItems = useMemo(() => {
        const raw: RecentDestinationDto[] = data ?? [];
        const seen = new Set<string>();
        const result: RecentDestinationDto[] = [];

        for (const item of raw) {
            const title = (item.title ?? "").trim();
            const road = (item.roadAddress ?? "").trim();
            const detail = (item.detailAddress ?? "").trim();
            const lat = Number(item.latitude);
            const lng = Number(item.longitude);

            const key =
                (item.placeId && String(item.placeId).trim()) ||
                `${title}|${road}|${detail}|${lat.toFixed(6)}|${lng.toFixed(6)}`;

            if (seen.has(key)) continue;
            seen.add(key);
            result.push(item);
        }

        return result;
    }, [data]);

    const { mutate: removeRecent, isPending } = useDeleteRecentDestination();

    return (
        <section className="mt-8 max-md:mt-7">
            <p className="text-sm font-semibold text-makcha-navy-900 dark:text-white max-md:text-[18px] max-md:font-medium max-md:text-[#262626]">
                최근 목적지
            </p>

            {isLoading ? (
                <div className="mt-3 text-sm text-gray-500">불러오는 중…</div>
            ) : uniqueItems.length === 0 ? (
                <div className="mt-3 text-sm text-gray-500">최근 목적지가 없어요.</div>
            ) : (
                <HorizontalScroll<RecentDestinationDto>
                    items={uniqueItems}
                    className="mt-3"
                    renderItem={(item) => (
                        <button
                            type="button"
                            className="
                                min-w-[120px] h-10
                                rounded-[20px]
                                border border-gray-200
                                bg-white
                                px-4
                                text-left
                                shadow-[0_0_5px_rgba(136,136,136,0.25)]
                                dark:border-makcha-navy-700 dark:bg-makcha-navy-900
                                max-md:w-auto max-md:h-10
                                max-md:rounded-[18px]
                                max-md:shadow-[0_0_5px_rgba(136,136,136,0.18)]
                                flex items-center justify-between gap-2
                            "
                        >
                            <span className="block min-w-0 flex-1 truncate text-sm">
                                {item.title}
                            </span>

                            <span
                                role="button"
                                tabIndex={0}
                                aria-label="최근 목적지 삭제"
                                className="
                                    shrink-0
                                    inline-flex items-center justify-center
                                    w-6 h-6 rounded-full
                                    hover:bg-gray-100 active:bg-gray-200
                                    dark:hover:bg-white/10 dark:active:bg-white/15
                                "
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (isPending) return;
                                    removeRecent(item.recentId);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key !== "Enter" && e.key !== " ") return;
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (isPending) return;
                                    removeRecent(item.recentId);
                                }}
                            >
                                <X className="h-4 w-4 text-gray-500 dark:text-white/60" />
                            </span>
                        </button>
                    )}
                    onItemClick={(item, moved) => {
                        if (moved) return;

                        const road = (item.roadAddress ?? "").trim();
                        const detail = (item.detailAddress ?? "").trim();

                        const addressText = (road || detail) ? `${road} ${detail}`.trim() : "주소 정보 없음";

                        onSelectDestination({
                            id: item.placeId || item.recentId,
                            title: (item.title ?? "").trim(),
                            roadAddress: road || "주소 정보 없음",
                            address: addressText,
                            detailAddress: detail,
                            lat: Number(item.latitude),
                            lng: Number(item.longitude),
                        });
                    }}
                />
            )}
        </section>
    );
};

export default RecentDestinations;
