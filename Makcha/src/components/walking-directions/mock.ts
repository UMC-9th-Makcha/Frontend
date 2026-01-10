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
