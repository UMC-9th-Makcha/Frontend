import KakaoLoginButton from "../../components/kakao/KakaoButton";

export default function LoginPanel() {
  return (
    <section className="w-full lg:w-[400px] shrink-0 flex flex-col border-r 
                        transition-all duration-300 ease-in-out
                        bg-white dark:bg-makcha-navy-900 
                        border-gray-100 dark:border-slate-800 z-20 shadow-sm">
      
      {/* 상단 헤더 */}
      <div className="pt-20 pb-10 text-center px-6 lg:px-10">
        <h2 className="text-2xl lg:text-[26px] font-extrabold tracking-tight
                       text-slate-900 dark:text-slate-50 leading-tight">
          오늘 택시비 <br />
          <span className="text-blue-600 dark:text-blue-400 drop-shadow-sm">
            30,000원
          </span> 아껴드릴게요
        </h2>
        <p className="text-[15px] mt-4 text-slate-500 dark:text-slate-400 font-medium">
          앱 설치 없이 100% 신뢰할 수 있는 막차 알림
        </p>
        
        <div className="flex justify-center my-12 relative">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/5 blur-3xl rounded-full scale-150" />
          <img 
            src="https://api.iconify.design/noto:owl.svg" 
            alt="Owl" 
            className="w-32 h-32 object-contain relative z-10"
          />
        </div>
      </div>

      {/* 입력 섹션: 배경색을 대시보드보다 아주 살짝만 다르게 하거나 동일하게 유지 */}
      <div className="px-8 mb-8">
        <h3 className="text-[13px] font-bold mb-4 text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">
          막차 알림 설정하기
        </h3>
        
        <div className="relative border rounded-2xl overflow-hidden transition-all
                        bg-slate-50 dark:bg-slate-800/40 
                        border-slate-200 dark:border-slate-700/50
                        focus-within:border-blue-500 dark:focus-within:border-blue-500/50
                        focus-within:ring-1 focus-within:ring-blue-500/20">
          
          <div className="absolute left-[25px] top-[38px] bottom-[38px] w-[2px] 
                          border-l-2 border-dashed border-slate-300 dark:border-slate-700 z-0"></div>
          
          <div className="flex items-center p-5 relative z-10">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-4 
                            shadow-[0_0_12px_rgba(59,130,246,0.5)] shrink-0"></div>
            <input 
              type="text" 
              placeholder="현위치 : 봉구비어 남영역점" 
              className="w-full text-[15px] font-semibold outline-none bg-transparent 
                         text-slate-800 dark:text-slate-200 
                         placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>   

          <div className="ml-14 mr-5 border-b border-slate-200 dark:border-slate-700/50"></div>

          <div className="flex items-center p-5 relative z-10">
            <div className="w-3 h-3 rounded-full bg-orange-400 mr-4 
                            shadow-[0_0_12px_rgba(251,146,60,0.5)] shrink-0"></div>
            <input 
              type="text" 
              placeholder="어디로 갈까요?" 
              className="w-full text-[15px] font-semibold outline-none bg-transparent 
                         text-slate-800 dark:text-slate-200 
                         placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>
        </div>
      </div>

      {/* 하단 섹션 */}
      <div className="px-8 mt-auto mb-16">
        <div className="transform transition-transform active:scale-[0.98]">
            <KakaoLoginButton />
        </div>
        <p className="text-center text-[13px] text-slate-400 dark:text-slate-500 mt-6 font-medium leading-relaxed">
          복잡한 회원가입 없이 <br />
          <span className="text-slate-600 dark:text-slate-300 font-bold underline underline-offset-4 decoration-slate-200 dark:decoration-slate-800">
            카톡으로 바로 시작해요!
          </span>
        </p>
      </div>
    </section>
  );
}