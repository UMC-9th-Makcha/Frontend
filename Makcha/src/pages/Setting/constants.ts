import type { Place } from "./types/setting";

export type ViewType = 'MAIN' | 'EDIT_HOME' | 'EDIT_FAVORITE' | 'EDIT_CONTACT';
export const TIME_LABELS = ['30분 전', '10분 전', '3분 전', '출발 알림'];

export const TIME_MAPPING: Record<string, number> = {
  '30분 전': 30,
  '10분 전': 10,
  '3분 전': 3,
  '출발 알림': 1,
};

export const REVERSE_TIME_MAPPING: Record<number, string> = Object.entries(TIME_MAPPING).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

export const DEFAULT_HOME: Place = {
  id: 'home',
  place_address: '',
  place_detail_address: '',
  latitude: 0,
  longitude: 0
};

export const SETTING_KEYS = {
  alarm: ['alarmSetting'] as const,
  place: ['placeSetting'] as const,
};