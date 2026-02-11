import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { authService } from "../apis/auth";
import axios from "axios";

export const useAutoLogin = () => {
  const { accessToken, isHydrated, setLogin, setLogout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  
  // 리렌더링 방지
  const retryRef = useRef(0);
  const maxRetries = 3;

  useEffect(() => {
    // 스토어가 로컬 스토리지와 동기화될 때까지 대기
    if (!isHydrated) return;

    const trySilentLogin = async () => {
      // 이미 토큰이 있으면 로딩 종료
      if (accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const newAccessToken = await authService.refreshAccessToken();
        setLogin(newAccessToken);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          if (retryRef.current < maxRetries) {
            retryRef.current += 1;
            setTimeout(trySilentLogin, 1500);
            return;
          }
        }

        setLogout();
        setIsLoading(false);
      }
    };

    trySilentLogin();

  }, [isHydrated, accessToken, setLogin, setLogout]);

  return isLoading;
};