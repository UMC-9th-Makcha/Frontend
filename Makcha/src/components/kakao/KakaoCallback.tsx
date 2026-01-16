import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/loadingSpinner';

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { login } = useAuth();
  
  // 중복 요청 방지
  const isProcessing = useRef(false);

  useEffect(() => {
    if (isProcessing.current) return;

    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const storedState = sessionStorage.getItem('kakao_auth_state');

    // 보안 검증 (CSRF 방지)
    if (!code || !state || state !== storedState) {
      console.error('로그인 실패: 유효하지 않은 인증 상태입니다.');
      alert('비정상적인 접근입니다. 다시 로그인해 주세요.');
      navigate('/', { replace: true });
      return;
    }

    // 인증 처리 시작
    isProcessing.current = true;
    sessionStorage.removeItem('kakao_auth_state');

    // Mutation 실행
    login(code);

  }, [searchParams, navigate, login]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-makcha-navy-900">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner />
        <p className="text-gray-500 font-medium">로그인 중입니다...</p>
      </div>
    </div>
  );
};

export default KakaoCallback;