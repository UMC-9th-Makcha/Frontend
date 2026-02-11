import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react'; // 추가
import useToastStore from '../../../store/useToastStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { alertService } from '../../../apis/alarm';
import { REVERSE_TIME_MAPPING, SETTING_KEYS, TIME_MAPPING } from '../constants';

interface MutationContext {
  previousSettings: string[] | undefined;
}

export const useAlarmSetting = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  const accessToken = useAuthStore((state) => state.accessToken);

  const { data: selectedTimes = [], isLoading } = useQuery({
    queryKey: SETTING_KEYS.alarm, 
    queryFn: async () => {
      const timeList = await alertService.getAlertSettings();
      if (!Array.isArray(timeList)) return []; 
      return timeList
        .map((time) => REVERSE_TIME_MAPPING[time])
        .filter((label): label is string => !!label);
    },
    enabled: !!accessToken,
    retry: false, 
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, 
  });

  const { mutateAsync } = useMutation<void, unknown, string[], MutationContext>({
    mutationFn: async (newTimes: string[]) => {
      const timeListForApi = newTimes
        .map((label) => TIME_MAPPING[label])
        .filter((val): val is number => val !== undefined);
      await alertService.updateAlertSettings(timeListForApi);
    },
    // 낙관적 업데이트
    onMutate: async (newTimes) => {
      await queryClient.cancelQueries({ queryKey: SETTING_KEYS.alarm });
      const previousSettings = queryClient.getQueryData<string[]>(SETTING_KEYS.alarm);

      queryClient.setQueryData(SETTING_KEYS.alarm, newTimes);
      
      return { previousSettings };
    },
    onError: (_err, _newTimes, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(SETTING_KEYS.alarm, context.previousSettings);
      }
      addToast('설정 변경에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SETTING_KEYS.alarm });
    },
  });

  const toggleTime = useCallback((timeLabel: string) => {
    const newTimes = selectedTimes.includes(timeLabel)
      ? selectedTimes.filter((t) => t !== timeLabel)
      : [...selectedTimes, timeLabel];

    mutateAsync(newTimes);
  }, [selectedTimes, mutateAsync]);

  return useMemo(() => ({ 
    selectedTimes, 
    isLoading, 
    toggleTime 
  }), [selectedTimes, isLoading, toggleTime]);
};