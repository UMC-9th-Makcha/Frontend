import type { AlarmRoute } from "../types/alarm";
import type { DestinationCard, RecentDestination } from "../types/destination";
import type { PlaceItem } from "../types/place";

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

export const RECENT_DESTINATIONS: RecentDestination[] = [
    { id: "r1", label: "집" },
    { id: "r2", label: "본가" },
    { id: "r3", label: "학교" },
    { id: "r4", label: "회사" },
];

export const MOCK_PLACES: PlaceItem[] = [
    {
        placeId: "p1",
        name: "서울역 봉구비어",
        address: "서울 중구 한강대로 405",
        lat: 37.554722,
        lng: 126.970833,
    },
    {
        placeId: "p2",
        name: "강남역",
        address: "서울 강남구 강남대로 396",
        lat: 37.497175,
        lng: 127.027926,
    },
    {
        placeId: "p3",
        name: "수원역",
        address: "경기 수원시 팔달구 덕영대로 924",
        lat: 37.266,
        lng: 127.0,
    },
];

export const ALARM_ROUTES_MOCK: AlarmRoute[] = [
    {
        id: "r1",
        isOptimal: true,
        routeType: "SUBWAY",
        lines: ["2호선", "472"],
        departureTime: "23:55",
        timeUntilDeparture: "출발까지 12분",
        totalDurationMin: 45,
        transferCount: 1,
        walkingTimeMin: 9,
    },
    {
        id: "r2",
        isOptimal: false,
        routeType: "SUBWAY",
        lines: ["2호선"],
        departureTime: "01:20",
        timeUntilDeparture: "출발까지 1시간 30분",
        totalDurationMin: 50,
        transferCount: 0,
        walkingTimeMin: 5,
    },
    {
        id: "r3",
        isOptimal: false,
        routeType: "NIGHT_BUS",
        lines: ["N26"],
        departureTime: "02:40",
        timeUntilDeparture: "출발까지 2시간 50분",
        totalDurationMin: 50,
        transferCount: 0,
        walkingTimeMin: 5,
    },
];

export const RECENT_DESTINATIONS_API_MOCK = [
    {
        recentId: "4",
        userId: "2",
        title: "스타벅스 강남역점",
        roadAddress: "서울 서초구 강남대로 375",
        detailAddress: "2층",
        placeId: "1234567890",
        latitude: 37.497942,
        longitude: 127.027621,
        usedAt: "2026-01-15T13:12:29.942Z",
        createdAt: "2026-01-15T13:07:43.477Z",
    },
];