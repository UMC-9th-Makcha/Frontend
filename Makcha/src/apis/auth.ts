import type { BaseResponse } from '../types/api';
import type { LoginResult, User } from '../types/auth';
import { api } from './api';

// [핵심] 갱신 요청이 진행 중인지 체크하는 전역 변수 (싱글톤 패턴)
let refreshPromise: Promise<string> | null = null;

export const authService = {
  // 로그인
  requestKakaoLogin: async (code: string, redirectUri: string): Promise<LoginResult> => {
    const { data } = await api.post<BaseResponse<LoginResult>>('/auth/kakao', { code, redirectUri });
    return data.result;
  },

  // AccessToken 재발급
  refreshAccessToken: async (): Promise<string> => {
    if (refreshPromise) {
      return refreshPromise;
    }
    refreshPromise = (async () => {
      try {
        const { data } = await api.post<BaseResponse<{ accessToken: string }>>('/auth/refresh');
        return data.result.accessToken;
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
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

  // 전화번호 인증번호 발송
  sendPhoneCode: async (phoneNumber: string): Promise<void> => {
    const rawPhone = phoneNumber.replace(/\D/g, "");
    await api.post<BaseResponse<null>>('/auth/phone/send', { phoneNumber: rawPhone });
  },

  // 전화번호 인증번호 검증 및 저장
  verifyPhoneCode: async (phoneNumber: string, code: string): Promise<void> => {
    const rawPhone = phoneNumber.replace(/\D/g, "");
    await api.post<BaseResponse<null>>('/auth/phone/verify', { 
      phoneNumber: rawPhone, 
      code 
    });
  },
};