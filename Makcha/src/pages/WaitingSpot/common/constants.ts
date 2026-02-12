export const waitingCategories = [
    { key: "ALL", label: "전체" },
    { key: "CAFE", label: "카페" },
    { key: "PC_ROOM", label: "PC방" },
    { key: "SAUNA", label: "찜질방" },
  ] as const;

  export const toggleLabel = {
    distance: "가까운순",
    "24hour": "24시간 우선",
  };

export const FALLBACK_CENTER = { lat: 37.5665, lng: 126.9780 }; //임시 좌표

export const routeCategories = [
    { key: "shortest", label: "최단" },
    { key: "safe", label: "안전우선" },
    { key: "bright", label: "밝은길" },
  ] as const;