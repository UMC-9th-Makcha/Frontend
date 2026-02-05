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
      return new Promise(() => {}); 
    }

    // 429 (Too Many Requests) 에러 방어
    if (status === 429) {
      return new Promise(() => {});
    }

    // 401 (토큰 만료) 에러 처리
    if ((status === 401 || errorData?.errorCode === 'AUTH-401-001') && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const token = await new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          if (token && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return await api(originalRequest);
        } catch (queueError) {
          return Promise.reject(queueError);
        }
      }

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
        
        processQueue(null, accessToken);
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return await api(originalRequest);
      } catch (refreshError: unknown) {
        processQueue(refreshError, null);
        useAuthStore.getState().setLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);