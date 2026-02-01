export const waitingCategories = [
    { key: "all", label: "전체" },
    { key: "night-cafe", label: "심야카페" },
    { key: "pc-cafe", label: "PC방" },
    { key: "sauna", label: "찜질방" },
  ] as const;

  export const toggleLabel = {
    distance: "가까운순",
    open24h: "24시간 우선",
  };

export const FALLBACK_CENTER = { lat: 37.5665, lng: 126.9780 }; //임시 좌표

export const routeCategories = [
    { key: "shortest", label: "최단" },
    { key: "safe", label: "안전우선" },
    { key: "bright", label: "밝은길" },
  ] as const;