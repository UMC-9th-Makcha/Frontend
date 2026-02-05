import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { authService } from "../apis/auth";
import { AxiosError } from "axios";

export const useAutoLogin = () => {
  const { isLoggedIn, accessToken, setLogin, setLogout } = useAuthStore();
  const isRefreshing = useRef(false);

  useEffect(() => {
    const silentLogin = async () => {
      // 로그인 상태인데 토큰이 없는 경우 (새로고침 직후)
      if (isLoggedIn && !accessToken && !isRefreshing.current) {
        isRefreshing.current = true;

        try {
          const newAccessToken = await authService.refreshAccessToken();
          setLogin(newAccessToken);
        } catch (error) {
          // api.ts서 넘어온 에러는 진짜 에러(유효하지 않은 토큰 등)
          if (error instanceof AxiosError) {
             if (error.response?.status === 429) return;
          }
          setLogout();
        } finally {
          isRefreshing.current = false;
        }
      }
    };

    silentLogin();
  }, [isLoggedIn, accessToken, setLogin, setLogout]);
};