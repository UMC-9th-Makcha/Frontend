import { api } from './api';
import type { BaseResponse } from '../types/api';

interface AlarmSettingsResult {
  timeList: number[];
}

export const alertService = {
  // 알림 설정 조회
  getAlertSettings: async (): Promise<number[]> => {
    const { data } = await api.get<BaseResponse<AlarmSettingsResult>>('/api/alerts/settings');
    return data.result?.timeList || [];
  },

  // 알림 설정 수정
  updateAlertSettings: async (timeList: number[]): Promise<void> => {
    await api.patch<BaseResponse<null>>('/api/alerts/settings', { timeList });
  },
};