import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import type { BaseResponse, ApiError } from '../types/api';
import type { LoginResult } from '../types/auth';

interface CustomConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RetryQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: RetryQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

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

    // 요청 취소, 네트워크 중단 에러 무시
    if (axios.isCancel(err) || err.code === 'ECONNABORTED' || err.code === 'ERR_NETWORK') {
      return Promise.reject(err);
    }

    // 401 (토큰 만료) 에러 처리
    if ((status === 401 || errorData?.errorCode === 'AUTH-401-001') && !originalRequest._retry) {
      
      // 이미 갱신 중이라면 대기열에 추가
      if (isRefreshing) {
        try {
          const token = await new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          if (token && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          originalRequest._retry = true; 
          return await api(originalRequest);
        } catch (queueError) {
          return Promise.reject(queueError);
        }
      }

      // 갱신 시작
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post<BaseResponse<LoginResult>>(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = data.result;
        useAuthStore.getState().setLogin(accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        // 대기열 처리
        processQueue(null, accessToken);
        isRefreshing = false;

        return await api(originalRequest);

      } catch (refreshError: unknown) {
        // 재발급 실패 시 로그아웃
        processQueue(refreshError, null);
        useAuthStore.getState().setLogout();
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);