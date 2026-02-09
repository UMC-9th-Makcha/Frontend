import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { authService } from "../apis/auth";
import axios from "axios";

export const useAutoLogin = () => {
  const { accessToken, setLogin, setLogout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trySilentLogin = async (retryCount = 0) => {
      if (accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const newAccessToken = await authService.refreshAccessToken();
        setLogin(newAccessToken);
        setIsLoading(false); // 성공 시 로딩 끝
      } catch (error) {

        if (axios.isAxiosError(error) && error.response?.status === 429) {
          if (retryCount < 3) {
            setTimeout(() => {
              trySilentLogin(retryCount + 1);
            }, 1500);
            return; 
          }
        }

        console.error("Auto login failed:", error);
        setLogout();
        setIsLoading(false);
      }
    };

    trySilentLogin();
  }, [accessToken, setLogin, setLogout]);

  return isLoading;
};