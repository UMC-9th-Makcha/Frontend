import type { User } from "../types/auth";

interface LoginResponse {
  token: string;
  user: User;
}

const MOCK_USER: User = {
  id: 20251230,
  nickname: '서막차', 
  profileImage: 'https://github.com/Bjaeng00.png',
};

/**
 * 네트워크 지연 시뮬레이션
 */
const simulateNetworkDelay = (ms: number = 1000) => 
  new Promise((resolve) => setTimeout(resolve, ms));

export const requestKakaoLogin = async (code: string): Promise<LoginResponse> => {
  if (import.meta.env.DEV) {
    console.log(`📡 [API Call] Kakao Login 요청 시작 (Code: ${code})`);
  }

  try {
    await simulateNetworkDelay(1200);

    if (code === 'fail') {
      throw new Error('인가 코드가 만료되었습니다.');
    }

    // TODO: 실제 백엔드 연동 시 아래 코드를 axios/fetch로 교체
    // const response = await axios.post<LoginResponse>('/auth/kakao', { code });
    // return response.data;

    return {
      token: 'mock-jwt-token-abcd-1234',
      user: MOCK_USER,
    };

  } catch (error) {
    console.error('❌ [API Error] 카카오 로그인 실패:', error);
    throw error;
  }
};