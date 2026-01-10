import type { User } from "../types/auth";

interface LoginResponse {
  token: string;
  user: User;
}

export const requestKakaoLogin = async (code: string): Promise<LoginResponse> => {
  // 백엔드와 연동 시 주석을 풀고 Mock 제거
  
  /*
  const response = await api.post<LoginResponse>('/api/auth/kakao', { code });
  return response.data;
  */

  // 현재는 Mock 데이터 반환
  await new Promise(res => setTimeout(res, 1000));
  return {
    token: 'mock-token',
    user: { id: 1, nickname: '서막차', profileImage: '', email: 'example@naver.com' }
  };
};

/*
export const requestKakaoLogin = async (code: string): Promise<LoginResponse> => {
  try {

    const response = await api.post<LoginResponse>('/api/auth/kakao', { code });
    
    return response.data;
  } catch (error) {
    console.error('Kakao Login Error:', error);
    throw new Error('로그인에 실패했습니다.');
  }
};
*/