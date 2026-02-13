import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { authService } from './auth'; // [중요] 위에서 만든 authService 임포트
import type { ApiError } from '../types/api';

interface CustomConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as CustomConfig;
    const errorData = err.response?.data as ApiError | undefined;
    const status = err.response?.status;

    // 네트워크 에러 등 처리
    if (!err.response || axios.isCancel(err) || err.code === 'ECONNABORTED' || err.code === 'ERR_NETWORK') {
      return Promise.reject(err);
    }

    // 무한루프 방지
    if (originalRequest.url?.includes('/auth/refresh')) {
       return Promise.reject(err);
    }

    // 401 에러 (토큰 만료) 처리
    if ((status === 401 || errorData?.errorCode === 'AUTH-401-001') && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await authService.refreshAccessToken();

        // 성공 시 스토어 업데이트 및 재요청 헤더 설정
        useAuthStore.getState().setLogin(newAccessToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        
        // 원래 요청 재실행
        return api(originalRequest);

      } catch (refreshError) {
        // 실패 시 로그아웃
        useAuthStore.getState().setLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);