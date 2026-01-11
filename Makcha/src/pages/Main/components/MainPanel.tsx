import KakaoLoginButton from "../../../components/kakao/KakaoButton";
import Panel from "../../../components/common/Panel";
import owlImage from "../../../assets/owl.png";
import PolicyLinks from "../../../components/common/PolicyLinks";

export default function LoginPanel() {
  return (
    <Panel className="z-20">
      {/* 헤더 */}
      <header className="text-center">
        <h2 className="text-2xl lg:text-[26px] font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
          오늘 택시비 <br />
          <span className="text-blue-600 dark:text-blue-400">30,000원</span> 아껴드릴게요
        </h2>
        <p className="text-[15px] mt-4 text-slate-500 dark:text-slate-400 font-medium">
          앱 설치 없이 100% 신뢰할 수 있는 막차 알림
        </p>
        
        {/* 캐릭터 이미지 */}
        <div className="flex justify-center my-8 relative">
          <div className="absolute inset-0 bg-blue-500/5 blur-2xl rounded-full scale-125" />
          <img 
            src={owlImage}
            alt="owl" 
            className="w-32 h-32 relative z-10 object-contain"
          />
        </div>
      </header>

      {/* 입력 */}
      <section className="mt-2">
        <h3 className="text-[13px] font-bold mb-3 text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1 text-left">
          막차 알림 설정하기
        </h3>
        
        <div className="relative border rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 focus-within:ring-1 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all text-left">
          <div className="absolute left-[24px] top-[38px] bottom-[38px] w-px border-l border-dashed border-slate-300 dark:border-slate-700" />
          
          <div className="flex items-center p-5 relative z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-4 shadow-sm" />
            <input 
              type="text" 
              placeholder="현위치 : 봉구비어 남영역점" 
              className="w-full text-[15px] font-semibold bg-transparent outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>   

          <div className="mx-10 border-b border-slate-200 dark:border-slate-700/50" />

          <div className="flex items-center p-5 relative z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-400 mr-4 shadow-sm" />
            <input 
              type="text" 
              placeholder="어디로 갈까요?" 
              className="w-full text-[15px] font-semibold bg-transparent outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>
        </div>
      </section>

      {/* 하단 */}
      <footer className="mt-12 text-center">
        <div className="active:scale-[0.98] transition-transform">
          <KakaoLoginButton />
        </div>
        
        <p className="text-[13px] text-slate-400 dark:text-slate-500 mt-4 font-medium">
          복잡한 회원가입 없이 <br />
          <span className="text-slate-600 dark:text-slate-300 font-bold underline underline-offset-4 decoration-slate-200 dark:decoration-slate-800">
            카톡으로 바로 시작해요!
          </span>
        </p>

        <PolicyLinks />
      </footer>
    </Panel>
  );
}