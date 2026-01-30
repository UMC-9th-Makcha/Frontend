import type { MapMarker, MapPathSegment } from "../../../types/map";
import type { Place, PlaceDetail } from "../../../types/waitingspot";
import type { Direction, DirectionDetail, RouteCategoryKey } from "../../../types/walking-direction";

//도보 안내 data (카테고리 별)
export const mockShortest = {
  id: 1,
  origin: {
    lat: 37.5665,
    lng: 126.9780,
    name: "봉구비어 남영역점",
  },
  destination: {
    id: 101,
    lat: 37.5650,
    lng: 126.9762,
    name: "도담 카페 신림점",
  },
  summary: {
    category: "shortest",
    durationSeconds: 180,
    distanceMeters: 230,
    crosswalkCount: 1,
  },
  
  markers: [
    {
      id: "start",
      name: "봉구비어 남영역점",
      variant: "start",
      position: { lat: 37.5772, lng: 126.9876 },
    },
    {
      id: "end",
      name: "도담 카페 신림점",
      variant: "end",
      position: { lat: 37.5754, lng: 126.9867 },
    },
  ] as MapMarker[],
  paths: [
    {
      type: "WALK",
      points: [
        { lat: 37.5772, lng: 126.9876 },
        { lat: 37.5758, lng: 126.9871 },
        { lat: 37.5754, lng: 126.9867 },
      ],
    },
  ] as MapPathSegment[],
} satisfies Direction;

export const mockSafe = {
  id: 1,
  origin: {
    lat: 37.5665,
    lng: 126.9780,
    name: "봉구비어 남영역점",
  },
  destination: {
    id: 101,
    lat: 37.5650,
    lng: 126.9762,
    name: "도담 카페 신림점",
  },
  summary: {
    category: "safe",
    durationSeconds: 180,
    distanceMeters: 250,
    crosswalkCount: 1,
  },
  
  markers: [
    {
      id: "start",
      name: "봉구비어 남영역점",
      variant: "start",
      position: { lat: 37.5772, lng: 126.9876 },
    },
    {
      id: "end",
      name: "도담 카페 신림점",
      variant: "end",
      position: { lat: 37.5754, lng: 126.9867 },
    },
  ] as MapMarker[],
  paths: [
    {
      type: "WALK",
      points: [
        { lat: 37.5772, lng: 126.9876 },
        { lat: 37.5763, lng: 126.9876 },
        { lat: 37.5754, lng: 126.9867 },
      ],
    },
  ] as MapPathSegment[],
} satisfies Direction;

export const mockBright = {
  id: 1,
  origin: {
    lat: 37.5665,
    lng: 126.9780,
    name: "봉구비어 남영역점",
  },
  destination: {
    id: 101,
    lat: 37.5650,
    lng: 126.9762,
    name: "도담 카페 신림점",
  },
  summary: {
    category: "bright",
    durationSeconds: 180,
    distanceMeters: 265,
    crosswalkCount: 1,
  },
  
  markers: [
    {
      id: "start",
      name: "봉구비어 남영역점",
      variant: "start",
      position: { lat: 37.5772, lng: 126.9876 },
    },
    {
      id: "end",
      name: "도담 카페 신림점",
      variant: "end",
      position: { lat: 37.5754, lng: 126.9867 },
    },
  ] as MapMarker[],
  paths: [
    {
      type: "WALK",
      points: [
        { lat: 37.5772, lng: 126.9876 },
        { lat: 37.5768, lng: 126.9881 },
        { lat: 37.5754, lng: 126.9867 },
      ],
    },
  ] as MapPathSegment[],
} satisfies Direction;

//카테고리
export const mockCategories = {
  shortest: mockShortest,
  safe: mockSafe,
  bright: mockBright,
};

//도보 안내 상세 패널 data
export const mockRouteDetail: Record<RouteCategoryKey, DirectionDetail> = {
  shortest: {
    routeId: 1,
    steps: [
      { order: 1, type: "START", instruction: "출발: 봉구비어 남영역점", point: { lat: 37.5772, lng: 126.9876 } },
      { order: 2, type: "STRAIGHT", instruction: "직진", distanceMeters: 120, durationSeconds: 90, point: { lat: 37.5758, lng: 126.9871 } },
      { order: 3, type: "CROSSWALK", instruction: "횡단보도 건너기", distanceMeters: 20, durationSeconds: 15 },
      { order: 4, type: "TURN_RIGHT", instruction: "우회전", distanceMeters: 90, durationSeconds: 60, point: { lat: 37.5754, lng: 126.9867 } },
      { order: 5, type: "ARRIVE", instruction: "도착: 도담 카페 신림점", point: { lat: 37.5754, lng: 126.9867 } },
    ],
  },

  safe: {
    routeId: 1,
    steps: [
      { order: 1, type: "START", instruction: "출발: 봉구비어 남영역점" },
      { order: 2, type: "STRAIGHT", instruction: "큰 길 따라 직진", distanceMeters: 140, durationSeconds: 110 },
      { order: 3, type: "CROSSWALK", instruction: "사거리 횡단보도 건너기" },
      { order: 4, type: "TURN_RIGHT", instruction: "우회전 후 60m 이동", distanceMeters: 60, durationSeconds: 50 },
      { order: 5, type: "ARRIVE", instruction: "도착: 도담 카페 신림점" },
    ],
  },

  bright: {
    routeId: 1,
    steps: [
      { order: 1, type: "START", instruction: "출발: 봉구비어 남영역점" },
      { order: 2, type: "STRAIGHT", instruction: "대로변(밝은 길) 따라 이동", distanceMeters: 160, durationSeconds: 120 },
      { order: 3, type: "TURN_RIGHT", instruction: "우회전", distanceMeters: 70, durationSeconds: 60 },
      { order: 4, type: "ARRIVE", instruction: "도착: 도담 카페 신림점" },
    ],
  },
};


//장소 mock data
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

export const mockPlaceDetails: PlaceDetail[] = [
  {
    id: 1,
    subcategory: "스터디 카페",
    imageUrl: "https://placehold.co/400x300",
    accessInfo: "당곡역 2번 출구에서 152m",
    phone: "02-1234-5678",
    badge: ["24시간", "연중무휴"],
  },
  {
    id: 2,
    subcategory: "PC방",
    imageUrl: "https://placehold.co/400x300",
    accessInfo: "당곡역 2번 출구에서 152m",
    phone: "02-1234-5678",
    badge: ["24시간", "연중무휴"],
  },
  {
    id: 3,
    subcategory: "찜질방",
    imageUrl: "https://placehold.co/400x300",
    accessInfo: "당곡역 2번 출구에서 152m",
    phone: "02-1234-5678",
    badge: ["24시간", "연중무휴"],
  },
  {
    id: 4,
    subcategory: "스터디 카페",
    imageUrl: "https://placehold.co/400x300",
    accessInfo: "당곡역 2번 출구에서 152m",
    phone: "02-1234-5678",
    badge: ["24시간", "연중무휴"],
  },
];

export const mockOrigins = [
  "서울역",
  "용산역",
  "이태원역",
];