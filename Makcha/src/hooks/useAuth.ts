import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { authService } from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import type { User, LoginResult } from '../types/auth';
import type { ApiError } from '../types/api';

export const useAuth = () => {
  const store = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 내 정보 조회
  const { data: userData, isLoading: isUserLoading } = useQuery<User, AxiosError<ApiError>>({
    queryKey: ['me'],
    queryFn: () => authService.getMe(),
    enabled: !!store.accessToken && store.isHydrated,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // 로그인
  const loginMutation = useMutation<LoginResult, AxiosError<ApiError>, string>({
    mutationFn: (code: string) => authService.requestKakaoLogin(code),
    onSuccess: (data) => {
      store.setLogin(data.accessToken);
      navigate('/', { replace: true });
    },
  });

  // 로그아웃
  const logoutMutation = useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      store.setLogout();
      queryClient.clear();
      navigate('/', { replace: true });
    },
  });

  // 회원 탈퇴
  const withdrawMutation = useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: () => authService.withdraw(),
    onSuccess: () => {
      store.setLogout();
      queryClient.clear();
      navigate('/', { replace: true });
    },
  });

  // 토큰 재발급
  const refreshMutation = useMutation<LoginResult, AxiosError<ApiError>, void>({
    mutationFn: () => authService.refresh(),
    onSuccess: (data) => {
      store.setLogin(data.accessToken);
    },
  });

  return {
    // 유저 정보
    user: userData || store.user,
    isLoggedIn: !!store.accessToken,
    
    // 로딩 상태
    isLoading: isUserLoading || loginMutation.isPending || withdrawMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isWithdrawing: withdrawMutation.isPending,
    isRefreshing: refreshMutation.isPending,
    
    // 액션 함수
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    withdraw: withdrawMutation.mutate,
    refresh: refreshMutation.mutate,
    updateUserPhone: store.updateUserPhone,
  };
};