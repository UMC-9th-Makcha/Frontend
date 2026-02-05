import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { alertService } from '../apis/alarm';
import { TIME_MAPPING, REVERSE_TIME_MAPPING } from '../pages/Setting/constants';
import type { AlarmState } from '../types/setting';
import useToastStore from '../store/useToastStore';

export const useAlarmStore = create<AlarmState>()(
  persist(
    (set, get) => ({
      selectedTimes: [],
      isLoading: false,

      fetchSettings: async () => {
        set({ isLoading: true });
        try {
          const timeList = await alertService.getAlertSettings(); 
          
          // 데이터 변환 (숫자 -> 문자열)
          const convertedTimes = timeList
            .map((time) => REVERSE_TIME_MAPPING[time])
            .filter((label): label is string => !!label);

          set({ selectedTimes: convertedTimes });
        } catch (error) {
            useToastStore.getState().addToast(error as string);
        } finally {
          set({ isLoading: false });
        }
      },

      // 설정 변경
      toggleTime: async (timeLabel: string) => {
        const currentTimes = get().selectedTimes;
        let newTimes: string[];

        // 낙관적 업데이트
        if (currentTimes.includes(timeLabel)) {
          newTimes = currentTimes.filter((t) => t !== timeLabel);
        } else {
          newTimes = [...currentTimes, timeLabel];
        }

        set({ selectedTimes: newTimes });

        // 전송용 데이터 변환 (문자열 -> 숫자)
        const timeListForApi = newTimes
          .map((label) => TIME_MAPPING[label])
          .filter((val): val is number => val !== undefined);

        // API 요청
        try {
          await alertService.updateAlertSettings(timeListForApi);
        } catch (error) {
          useToastStore.getState().addToast(error as string);
        }
      },
      
      resetSettings: () => set({ selectedTimes: [] }),
    }),
    {
      name: 'setting-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selectedTimes: state.selectedTimes }),
    }
  )
);