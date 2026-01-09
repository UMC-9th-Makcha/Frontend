export type OriginSearchItem = {
    id: string;
    title: string;
    address: string; 
};

export const ORIGIN_SEARCH_MOCK: OriginSearchItem[] = [
    {
        id: "o1",
        title: "수원역",
        address: "경기도 수원시 권선구 세류동 60(세류동)",
    },
    {
        id: "o2",
        title: "강남역 2번 출구",
        address: "서울특별시 서초구 강남대로 396",
    },
    {
        id: "o4",
        title: "종로3가역",
        address: "서울특별시 종로구 돈화문로",
    },
    {
        id: "o5",
        title: "잠실역",
        address: "서울특별시 송파구 올림픽로 240",
    },
];
