import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { authService } from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import type { User, LoginResult } from '../types/auth';
import type { ApiError } from '../types/api';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const storeUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setLogin = useAuthStore((state) => state.setLogin);
  const setLogout = useAuthStore((state) => state.setLogout);
  const updateUserPhoneStore = useAuthStore((state) => state.updateUserPhone);

  // 내 정보 조회
  const { data: userData, isLoading: isUserLoading } = useQuery<User, AxiosError<ApiError>>({
    queryKey: ['me'],
    queryFn: () => authService.getMe(),
    enabled: isLoggedIn && isHydrated, 
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // 로그인
  const loginMutation = useMutation<LoginResult, AxiosError<ApiError>, string>({
    mutationFn: (code: string) => authService.requestKakaoLogin(code),
    onSuccess: (data) => {
      setLogin(data.accessToken);
      navigate('/', { replace: true });
    },
  });

  // 로그아웃
  const logoutMutation = useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      setLogout();
      queryClient.clear();
      navigate('/', { replace: true });
    },
  });

  // 회원 탈퇴
  const withdrawMutation = useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: () => authService.withdraw(),
    onSuccess: () => {
      setLogout();
      queryClient.clear();
      navigate('/', { replace: true });
    },
  });

  useEffect(() => {
    if (userData && JSON.stringify(userData) !== JSON.stringify(storeUser)) {
      setUser(userData);
    }
  }, [userData, storeUser, setUser]);

  const login = useCallback((code: string) => {
    loginMutation.mutate(code);
  }, [loginMutation]);

  const logout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  const withdraw = useCallback(() => {
    withdrawMutation.mutate();
  }, [withdrawMutation]);

  const updateUserPhone = useCallback((newPhone: string) => {
    updateUserPhoneStore(newPhone);
  }, [updateUserPhoneStore]);

  return {
    user: userData || storeUser,
    isLoggedIn,
    accessToken,
    
    isLoading: isUserLoading || loginMutation.isPending || withdrawMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isWithdrawing: withdrawMutation.isPending,
    
    login,
    logout,
    withdraw,
    updateUserPhone,
  };
};