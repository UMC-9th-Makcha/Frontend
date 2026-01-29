import { api } from './api';
import type { BaseResponse } from '../types/api';
import type { LoginResult, User } from '../types/auth';

export const authService = {
  // 로그인
  requestKakaoLogin: async (code: string): Promise<LoginResult> => {
    const { data } = await api.post<BaseResponse<LoginResult>>('/auth/kakao', { code });
    return data.result;
  },

  // 정보 조회
  getMe: async (): Promise<User> => {
    const { data } = await api.get<BaseResponse<User>>('/api/me');
    return data.result;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    await api.post<BaseResponse<null>>('/auth/logout');
  },

  // 탈퇴
  withdraw: async (): Promise<void> => {
    await api.delete<BaseResponse<null>>('/auth/withdraw');
  },
};