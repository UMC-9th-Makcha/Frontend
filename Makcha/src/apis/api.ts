import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      const { state } = JSON.parse(authData);
      if (state.accessToken) {
        config.headers.Authorization = `Bearer ${state.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('인증이 만료되었습니다. 다시 로그인해주세요.');
      // 여기서 로그아웃 처리 등을 할 수 있습니다.
    }
    return Promise.reject(error);
  }
);