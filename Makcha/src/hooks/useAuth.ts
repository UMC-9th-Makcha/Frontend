import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useCallback, useMemo } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { authService } from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import type { User, LoginResult } from '../types/auth';
import type { ApiError } from '../types/api';
import useToastStore from '../store/useToastStore';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const storeUser = useAuthStore((state) => state.user);

  const setUser = useAuthStore((state) => state.setUser);
  const setLogin = useAuthStore((state) => state.setLogin);
  const setLogout = useAuthStore((state) => state.setLogout);
  const updateUserPhoneStore = useAuthStore((state) => state.updateUserPhone);

  const { data: userData, isLoading: isUserLoading } = useQuery<User, AxiosError<ApiError>>({
    queryKey: ['me'],
    queryFn: () => authService.getMe(),
    enabled: isLoggedIn && isHydrated && !!accessToken, 
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation<LoginResult, AxiosError<ApiError>, { code: string; redirectUri: string }>({
    mutationFn: ({code, redirectUri}) => authService.requestKakaoLogin(code, redirectUri),
    onSuccess: (data) => {
      setLogin(data.accessToken);
      addToast("환영합니다!", "success");
      navigate('/', { replace: true });
    },
  });

  const logoutMutation = useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      setLogout();
      queryClient.clear();
      addToast("로그아웃 되었습니다.", "success");
      navigate('/', { replace: true });
    },
  });

  const withdrawMutation = useMutation<void, AxiosError<ApiError>, void>({
    mutationFn: () => authService.withdraw(),
    onSuccess: () => {
      setLogout();
      queryClient.clear();
      addToast("회원 탈퇴가 완료되었습니다.", "success");
      navigate('/', { replace: true });
    },
  });

  useEffect(() => {
    if (userData) {
      const isDifferent = !storeUser || userData.id !== storeUser.id || userData.phone !== storeUser.phone;
      if (isDifferent) setUser(userData);
    }
  }, [userData, storeUser, setUser]);

  const login = useCallback((code: string) => {
    const redirectUri = `${window.location.origin}/kakao/callback`; 
    return loginMutation.mutateAsync({ code, redirectUri });
  }, [loginMutation]);

  const logout = useCallback(() => logoutMutation.mutateAsync(), [logoutMutation]);
  const withdraw = useCallback(() => withdrawMutation.mutateAsync(), [withdrawMutation]);

  const updateUserPhone = useCallback((newPhone: string) => {
    updateUserPhoneStore(newPhone);
  }, [updateUserPhoneStore]);

  return useMemo(() => ({
    user: userData || storeUser,
    isLoggedIn,
    accessToken,
    isLoading: isUserLoading || loginMutation.isPending || withdrawMutation.isPending || logoutMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isWithdrawing: withdrawMutation.isPending,
    login,
    logout,
    withdraw,
    updateUserPhone,
  }), [userData, storeUser, isLoggedIn, accessToken, isUserLoading, loginMutation.isPending, withdrawMutation.isPending, logoutMutation.isPending, login, logout, withdraw, updateUserPhone]);
};