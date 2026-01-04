import KakaoLoginButton from "../../components/kakao/KakaoButton";

export default function LoginPanel() {
  return (
    <section className="w-full lg:w-[400px] shrink-0 flex flex-col border-r 
                        transition-all duration-300 ease-in-out
                        bg-white dark:bg-[#1a1b1e] 
                        border-gray-100 dark:border-gray-800 z-20 shadow-sm">
      
      {/* 상단 문구 및 부엉이 */}
      <div className="pt-24 pb-10 text-center px-4 lg:px-8">
        <h2 className="text-xl lg:text-[22px] font-extrabold whitespace-nowrap
                       text-[#1A2B4E] dark:text-gray-100 tracking-tight">
          오늘 택시비 <span className="text-blue-600 dark:text-blue-400">30,000원</span> 아껴드릴게요
        </h2>
        <p className="text-sm mt-4 text-gray-400 dark:text-gray-500 font-medium">
          앱 설치 없이 100% 신뢰할 수 있는 막차 알림
        </p>
        
        <div className="flex justify-center my-12">
          <img 
            src="https://api.iconify.design/noto:owl.svg" 
            alt="Owl" 
            className="w-32 h-32 object-contain dark:opacity-90"
          />
        </div>
      </div>

      {/* 막차 알림 설정 파트 */}
      <div className="px-8 mb-8">
        <h3 className="text-sm font-bold mb-4 text-gray-800 dark:text-gray-200 ml-1">막차 알림 설정하기</h3>
        <div className="border rounded-2xl overflow-hidden shadow-sm transition-colors
                        bg-white dark:bg-[#25262b] 
                        border-gray-200 dark:border-gray-700">
          
          <div className="flex items-center p-5 border-b border-gray-100 dark:border-gray-700">
            <div className="w-3 h-3 rounded-full bg-[#4A86FF] mr-4 shadow-[0_0_10px_rgba(74,134,255,0.4)] shrink-0"></div>
            <input 
              type="text" 
              placeholder="현위치 : 봉구비어 남영역점" 
              className="w-full text-[15px] outline-none bg-transparent 
                         text-gray-700 dark:text-gray-100 
                         placeholder:text-gray-300 dark:placeholder:text-gray-600"
            />
          </div>
          
          <div className="flex items-center p-5">
            <div className="w-3 h-3 rounded-full bg-[#FFB347] mr-4 shadow-[0_0_10px_rgba(255,179,71,0.4)] shrink-0"></div>
            <input 
              type="text" 
              placeholder="어디로 갈까요?" 
              className="w-full text-[15px] outline-none bg-transparent 
                         text-gray-700 dark:text-gray-100 
                         placeholder:text-gray-300 dark:placeholder:text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* 카카오 로그인 */}
      <div className="px-8 mt-auto mb-16">
        <KakaoLoginButton />
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-5 font-medium leading-relaxed">
          복잡한 회원가입 없이 카톡으로 바로 시작해요!
        </p>
      </div>
    </section>
  );
}