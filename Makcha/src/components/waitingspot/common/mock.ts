import type { Place } from "../../../types/waitingspot";

export const mockDirections = {
    id: 1,
    origin: {
      lat: 37.5413,
      lng: 126.9717,
      name: "봉구비어 남영역점",
    },
    destination: {
      id: 101,
      lat: 37.4845,
      lng: 126.9292,
      name: "도담 카페 신림점",
    },
    summary: {
      category: "shortest",
      durationSeconds: 780,
      distanceMeters: 950,
      crosswalkCount: 1,
    },
  } as const;

export const mockPlaces: Place[] = [
  {
    id: 1,
    name: "24시 별빛 카페",
    category: "night-cafe",
    address: "서울 용산구 한강대로",
    distanceMeter: 400,
    durationSeconds: 90,
    badge: "곧 마감 04:00까지 운영",
    lat: 37.5294,
    lng: 126.9677,
  },
  {
    id: 2,
    name: "용산 PC존",
    category: "pc-cafe",
    address: "서울 용산구 이태원로",
    distanceMeter: 400,
    durationSeconds: 90,
    badge: "곧 마감 04:00까지 운영",
    lat: 37.5349,
    lng: 126.9946,
  },
  {
    id: 3,
    name: "한강 사우나",
    category: "sauna",
    address: "서울 용산구 서빙고로",
    distanceMeter: 400,
    durationSeconds: 90,
    badge: "곧 마감 04:00까지 운영",
    lat: 37.5206,
    lng: 126.9723,
  },
  {
    id: 4,
    name: "미드나잇 스터디 카페",
    category: "night-cafe",
    address: "서울 용산구 후암로",
    distanceMeter: 400,
    durationSeconds: 90,
    badge: "곧 마감 04:00까지 운영",
    lat: 37.5482,
    lng: 126.9758,
  },
];
