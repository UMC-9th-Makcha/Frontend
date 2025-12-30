import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { requestKakaoLogin } from '../../apis/auth';
import LoadingSpinner from '../common/loadingSpinner';

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLogin } = useAuth();
  
  // 중복 요청 방지
  const isProcessing = useRef(false);

  useEffect(() => {
    if (isProcessing.current) return;

    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const storedState = sessionStorage.getItem('kakao_auth_state');

    // CSRF 방지 state
    if (!code || !state || state !== storedState) {
      navigate('/', { replace: true });
      return;
    }

    const handleAuth = async () => {
      isProcessing.current = true;
      sessionStorage.removeItem('kakao_auth_state');

      try {
        const { token, user } = await requestKakaoLogin(code);
        setLogin(token, user);
        navigate('/home', { replace: true });
      } catch {
        // 에러 시 메인으로
        navigate('/', { replace: true });
      }
    };

    handleAuth();
  }, [searchParams, navigate, setLogin]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
};

export default KakaoCallback;