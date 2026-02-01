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

    // 토큰 만료 에러 처리 (401)
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

        const { accessToken} = data.result;
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

    handleGlobalError(err);
    return Promise.reject(err);
  }
);

function handleGlobalError(err: AxiosError) {
  const status = err.response?.status;
  const errorData = err.response?.data as ApiError | undefined;
  const message = errorData?.message || "알 수 없는 에러가 발생했습니다.";

  switch (status) {
    case 400:
      console.error("잘못된 요청:", message);
      break;
    case 403:
      console.error("권한 없음:", message);
      break;
    case 404:
      console.error("찾을 수 없음:", message);
      break;
    case 500:
      console.error("서버 내부 에러:", message);
      break;
    default:
      console.error("네트워크 또는 기타 에러:", err.message);
  }
}