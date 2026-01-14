import type { PathType } from "../../../types/map";

export const DEFAULT_MAP_CENTER = { lat: 37.5665, lng: 126.9780 };

/* 노선 타입별 공식 색상 */
export const PATH_COLORS: Record<PathType, { light: string; dark: string }> = {
  SUBWAY_1: { light: "#0052A4", dark: "#003A75" },
  SUBWAY_2: { light: "#3CB44A", dark: "#2E8B3A" },
  SUBWAY_3: { light: "#EF7C1C", dark: "#C26214" },
  SUBWAY_4: { light: "#00A5DE", dark: "#007BA6" },
  SUBWAY_5: { light: "#996CAC", dark: "#7B558C" },
  SUBWAY_6: { light: "#CD7C2F", dark: "#A66224" },
  SUBWAY_7: { light: "#747F28", dark: "#59611F" },
  SUBWAY_8: { light: "#E6186C", dark: "#B31254" },
  SUBWAY_9: { light: "#BB8336", dark: "#94672B" },
  SUBWAY_SUIN: { light: "#FFB300", dark: "#CC8F00" },
  BUS_RED: { light: "#F43F5E", dark: "#991B1B" },
  BUS_BLUE: { light: "#0068B7", dark: "#004D87" },
  BUS_GREEN: { light: "#53B332", dark: "#3D8525" },
  BUS_VILLAGE: { light: "#53B332", dark: "#3D8525" },
  BUS_GYEONGGI: { light: "#00A0E9", dark: "#0077AD" },
  WALK: { light: "#9CA3AF", dark: "#6B7280" },
};