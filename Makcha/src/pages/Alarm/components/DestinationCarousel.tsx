import { Home, Plus } from "lucide-react";
import type { OriginSearchItem } from "../types/search";
import { HorizontalScroll } from "../../../components/common/HorizontalScroll";
import { useQuery } from "@tanstack/react-query";
import { getMyPlaces } from "../../../apis/place"; 
import { useNavigate } from "react-router-dom";

type Props = {
    onSelectDestination: (item: OriginSearchItem) => void;
};

type DestinationItem =
    | {
        kind: "HOME";
        id: string;
        label: string; 
        address: string;
        detailAddress?: string;
        lat: number;
        lng: number;
    }
    | {
        kind: "EMPTY_HOME";
        id: "empty-home";
    };

const DestinationCarousel = ({ onSelectDestination }: Props) => {
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ["myplaces"],
        queryFn: getMyPlaces,
    });

    const items: DestinationItem[] = [];

    if (data?.home) {
        items.push({
            kind: "HOME",
            id: data.home.provider_place_id ?? data.home.myplace_id,
            label: "집",
            address: data.home.place_address,
            detailAddress: data.home.place_detail_address ?? "",
            lat: data.home.latitude,
            lng: data.home.longitude,
        });
    } else {
        items.push({ kind: "EMPTY_HOME", id: "empty-home" });
    }

    return (
        <section className="mt-8 max-md:mt-7">
            <p className="text-sm font-semibold text-makcha-navy-900 dark:text-white max-md:text-[18px] max-md:font-medium max-md:text-[#262626]">
                도착지
            </p>

            <HorizontalScroll
                items={items}
                className="mt-3"
                contentClassName="shrink-0"
                renderItem={(d) => {
                    if (d.kind === "EMPTY_HOME") {
                        return (
                            <button
                                type="button"
                                className="
                                    w-64 h-30
                                    rounded-[20px]
                                    border border-dashed border-gray-300
                                    bg-white p-4
                                    shadow-sm text-left
                                    dark:border-makcha-navy-700 dark:bg-makcha-navy-900
                                    max-md:w-75 max-md:h-33
                                    max-md:rounded-[18px]
                                "
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10">
                                        <Plus className="h-4 w-4 text-gray-500 dark:text-white/70" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-white/80 max-md:text-[13px]">
                                        집을 설정해보세요
                                    </span>
                                </div>

                                <div className="mt-2 text-[20px] font-bold leading-none text-makcha-navy-900 dark:text-white">
                                    집 등록하기
                                </div>

                                <div className="mt-2 text-xs text-gray-500 max-md:truncate max-md:text-[12px]">
                                    설정에서 집 주소를 저장하면 빠르게 선택할 수 있어요
                                </div>
                            </button>
                        );
                    }

                    // HOME 카드
                    return (
                        <button
                            type="button"
                            className="
                                w-64 h-30
                                rounded-[20px]
                                border border-gray-200
                                bg-white p-4
                                shadow-sm text-left
                                dark:border-makcha-navy-700 dark:bg-makcha-navy-900
                                max-md:w-75 max-md:h-33
                                max-md:rounded-[18px]
                            "
                        >
                            <div className="flex items-center gap-2">
                                <Home className="h-5 w-5 text-makcha-navy-600" strokeWidth={1.5} />
                                <span className="text-sm font-semibold text-makcha-navy-600 max-md:text-[13px]">
                                    {d.label}
                                </span>
                            </div>

                            <div className="mt-2 text-[22px] font-bold leading-none text-makcha-navy-900 dark:text-white">
                                집
                            </div>

                            <div className="mt-2 text-xs text-gray-500 max-md:truncate max-md:text-[12px]">
                                {d.address}
                            </div>
                        </button>
                    );
                }}
                onItemClick={(d) => {
                    if (d.kind === "EMPTY_HOME") {
                        // Setting의 집 편집 화면으로 이동
                        navigate("/setting", {
                            state: { from: "ALARM", open: "EDIT_HOME" }, // <- Setting에서 이 state로 뷰 열어주면 베스트
                        });
                        return;
                    }

                    onSelectDestination({
                        id: d.id,
                        title: "집",
                        address: d.address,
                        roadAddress: d.address,
                        detailAddress: d.detailAddress ?? "",
                        lat: d.lat,
                        lng: d.lng,
                    });
                }}
            />
        </section>
    );
};

export default DestinationCarousel;
