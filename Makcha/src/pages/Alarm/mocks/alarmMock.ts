export type DestinationCard = {
    id: string;
    label: string;
    time: string;
    address: string;
};

export const DESTINATIONS: DestinationCard[] = [
    {
        id: "home",
        label: "집으로",
        time: "01:20 출발",
        address: "서울 성북구 삼선동5가, 0동 123호",
    },
    {
        id: "parents",
        label: "본가로",
        time: "00:14 출발",
        address: "경기도 수원시 ...",
    },
];

export const RECENT_DESTINATIONS = [
    { id: "r1", label: "집" },
    { id: "r2", label: "본가" },
    { id: "r3", label: "학교" },
    { id: "r4", label: "회사" },
];
