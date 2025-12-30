import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { requestKakaoLogin } from '../../apis/auth';


const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const { setLogin } = useAuth();
  
  const isProcessing = useRef(false);

  /**
   * 인증 처리 핸들러
   */
  const handleAuth = useCallback(async (code: string) => {
    try {
      if (import.meta.env.DEV) {
        console.log('🚀 카카오 인증 시작 - 인가 코드:', code);
      }

      // API 호출하여 토큰과 유저 정보 획득
      const { token, user } = await requestKakaoLogin(code);
      
      // Zustand 스토어에 저장
      setLogin(token, user);

      if (import.meta.env.DEV) {
        console.log('✅ 인증 성공! 유저 정보:', user);
      }

      // 홈으로 이동
      navigate('/home', { replace: true });
      
    } catch (error) {
      console.error('❌ 인증 중 오류 발생:', error);
      alert('로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
      navigate('/', { replace: true });
    }
  }, [navigate, setLogin]);

  /**
   * 마운트 시 URL에서 code 추출 후 인증 실행
   */
  useEffect(() => {
    const code = searchParams.get('code');

    if (code && !isProcessing.current) {
      isProcessing.current = true;
      handleAuth(code);
    } else if (!code) {
      console.error('❌ 인가 코드가 URL에 존재하지 않습니다.');
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate, handleAuth]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-makcha-navy-900 text-white p-6">
      {/* 로딩 애니메이션 */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 border-4 border-makcha-navy-600 rounded-full opacity-25"></div>
        <div className="absolute inset-0 border-4 border-t-makcha-yellow-500 rounded-full animate-spin"></div>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-makcha-yellow-500">
          안전하게 로그인 중입니다
        </h2>
        <p className="text-makcha-navy-200 font-medium">
          막차 서비스로 곧 연결됩니다. 잠시만 기다려 주세요.
        </p>
      </div>

      <div className="fixed bottom-12 text-makcha-navy-600 text-sm font-bold tracking-widest uppercase">
        Makcha Authentication System
      </div>
    </div>
  );
};

export default KakaoCallback;