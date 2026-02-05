import type { RouteConfirmDetail } from "../types/routeConfirm";

export const ROUTE_CONFIRM_DETAIL_MOCK: Record<string, RouteConfirmDetail> = {
    r1: {
        etaText: "00:40 도착",
        segments: [
            { mode: "WALK", durationMin: 1, distanceM: 80, mapType: "WALK" },
            { mode: "SUBWAY", lineLabel: "2호선", from: "강남역", to: "사당역", durationMin: 30, stops: 8, mapType: "SUBWAY_2" },
            { mode: "WALK", durationMin: 1, distanceM: 80, mapType: "WALK" },
            { mode: "BUS", lineLabel: "472", from: "사당역", to: "성신여대입구역", durationMin: 7, stops: 2, mapType: "BUS_BLUE" },
            { mode: "WALK", durationMin: 6, distanceM: 80, mapType: "WALK" },
        ],
    },
    r2: {
        etaText: "02:10 도착",
        segments: [
            { mode: "WALK", durationMin: 3, distanceM: 200, mapType: "WALK" },
            { mode: "SUBWAY", lineLabel: "2호선", from: "강남역", to: "잠실역", durationMin: 40, stops: 10, mapType: "SUBWAY_2" },
            { mode: "WALK", durationMin: 7, distanceM: 500, mapType: "WALK" },
        ],
    },
    r3: {
        etaText: "03:30 도착",
        segments: [
            { mode: "WALK", durationMin: 5, distanceM: 350, mapType: "WALK" },
            { mode: "BUS", lineLabel: "N26", from: "강남역", to: "성북구청", durationMin: 45, stops: 12, mapType: "BUS_RED" },
        ],
    },
};
