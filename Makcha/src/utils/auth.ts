export const KAKAO_AUTH_URL = (state: string): string => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
      redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      response_type: 'code',
      state,
    });
    return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
  };
  
export const generateRandomState = () => {
    return self.crypto.randomUUID(); 
  };