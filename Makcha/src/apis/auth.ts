import type { BaseResponse } from '../types/api';
import type { LoginResult, User } from '../types/auth';
import { api } from './api';

/* FIX: 백엔드 연동 시 IS_MOCK을 false로 바꾸거나, 
 * MOCK_AUTH_DATA와 관련된 if 블록을 삭제
 */
const IS_MOCK = true;
const MOCK_AUTH_DATA: LoginResult = {
  accessToken: 'mock-access-token',
  expiresIn: 3600,
  user: {
    id: '1',
    nickname: '백병재',
    profileImage: 'https://picsum.photos/200',
    email: 'test@kakao.com',
  },
};

export const authService = {

  requestKakaoLogin: async (code: string): Promise<LoginResult> => {
    if (IS_MOCK) {
      await new Promise((res) => setTimeout(res, 800));
      return MOCK_AUTH_DATA;
    }

    const { data } = await api.post<BaseResponse<LoginResult>>('/api/auth/kakao', { code });
    return data.result;
  },

  // 현재 로그인한 사용자 정보
  getMe: async (): Promise<User> => {
    if (IS_MOCK) {
      return MOCK_AUTH_DATA.user;
    }

    const { data } = await api.get<BaseResponse<User>>('/api/auth/me');
    return data.result;
  },

  //로그아웃
  logout: async (): Promise<void> => {
    if (IS_MOCK) {
      return;
    }

    await api.post<BaseResponse<null>>('/api/auth/logout');
  },
};