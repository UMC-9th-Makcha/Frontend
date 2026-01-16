import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
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
    throwOnError: (error: AxiosError<ApiError>) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        store.setLogout();
        return true;
      }
      return false;
    },
    staleTime: 1000 * 60 * 5,
  });

  // 로그인
  const loginMutation = useMutation<LoginResult, AxiosError<ApiError>, string>({
    mutationFn: (code: string) => authService.requestKakaoLogin(code),
    onSuccess: (data) => {
      store.setLogin(data.accessToken, data.user);
      queryClient.setQueryData(['me'], data.user);
      navigate('/', { replace: true });
    },
  });

  // 로그아웃
  const logoutMutation = useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      store.setLogout();
      queryClient.setQueryData(['me'], null);
      queryClient.removeQueries({ queryKey: ['me'] });
      navigate('/', { replace: true });
    },
  });

  return {
    user: store.accessToken ? (userData ?? store.user) : null,
    isLoggedIn: !!store.accessToken,
    isLoading: isUserLoading || loginMutation.isPending,
    
    // Mutation Actions
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    
    // 로딩 상태
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    // 스토어 수동 조작
    setLogin: store.setLogin,
    setLogout: store.setLogout,
  };
};