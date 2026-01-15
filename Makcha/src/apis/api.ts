import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import type { BaseResponse, ApiError} from '../types/api'; 
import type { LoginResult } from '../types/auth';

/* 요청 설정 확장 */
interface CustomConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/* 리트라이 큐 아이템 타입 */
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
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
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

    if (errorData?.errorCode === 'AUTH-401-001' && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers && token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err: unknown) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post<BaseResponse<LoginResult>>(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken, user } = data.result;

        useAuthStore.getState().setLogin(accessToken, user);
        
        processQueue(null, accessToken);
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return api(originalRequest);
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