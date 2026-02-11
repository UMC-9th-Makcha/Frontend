import KakaoLoginButton from "../../../components/kakao/KakaoButton";
import Panel from "../../../components/common/Panel";
import owlImage from "../../../assets/owl.png";
import PolicyLinks from "../../../components/common/PolicyLinks";
import useToastStore from "../../../store/useToastStore"; 

export default function LoginPanel() {
  const { addToast } = useToastStore();

  const handleInputClick = () => {
    addToast("로그인이 필요한 기능입니다.", "error");
  };

  return (
    <Panel className="z-20">
      {/* 헤더 */}
      <header className="text-center">
        <h1 className="font-extrabold tracking-tight leading-tight">
          오늘 택시비 <br />
          <span className="text-blue-600 dark:text-makcha-yellow-500">20,000원</span> 아껴드릴게요
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">
          앱 설치 없이 100% 신뢰할 수 있는 막차 알림
        </p>
        
        <div className="flex justify-center my-8 relative">
          <div className="absolute inset-0 blur-2xl rounded-full scale-125" />
          <img 
            src={owlImage}
            alt="owl" 
            className="w-32 h-32 relative z-10 object-contain"
          />
        </div>
      </header>

      {/* 입력 섹션 */}
      <section className="mt-2">
        <p className="font-bold mb-3 text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1 text-left">
          막차 알림 설정하기
        </p>
        
        <div className="relative border rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 focus-within:ring-1 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all text-left">
          <div className="absolute left-[24px] top-[38px] bottom-[38px] w-px border-l border-dashed border-slate-300 dark:border-slate-700" />
          
          {/* 출발지 입력 */}
          <div 
            onClick={handleInputClick} 
            className="flex items-center p-5 relative z-10 cursor-text"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-makcha-navy-600 mr-4 shadow-sm" />
            <input 
              type="text" 
              readOnly 
              placeholder="현위치" 
              className="w-full text-[15px] font-semibold bg-transparent outline-none text-slate-400 dark:text-slate-500 placeholder:text-slate-300 dark:placeholder:text-slate-600 pointer-events-none" 
            />
          </div>   

          <div className="mx-10 border-b border-slate-200 dark:border-slate-700/50" />

          {/* 도착지 입력 */}
          <div 
             onClick={handleInputClick}
             className="flex items-center p-5 relative z-10 cursor-text"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-makcha-yellow-500 mr-4 shadow-sm" />
            <input 
              type="text" 
              readOnly 
              placeholder="어디로 갈까요?" 
              className="w-full text-small font-semibold bg-transparent outline-none text-slate-400 dark:text-slate-500 placeholder:text-slate-300 dark:placeholder:text-slate-600 pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* 하단 */}
      <footer className="mt-12 text-center">
        <div className="active:scale-[0.98] transition-transform">
          <KakaoLoginButton />
        </div>
        
        <p className="text-slate-400 dark:text-slate-500 mt-4 font-medium">
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