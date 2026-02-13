import owlImage from "../../../assets/owl.png";

export const DownloadHero = () => {
  return (
    <div className="flex flex-col items-center text-center pb-4 px-6 animate-fade-in-up">
      {/* 상단 타이틀 섹션 */}
      <div className="space-y-2 mb-8">
        <h2>
          막차 알림을 넘어선
        </h2>
        <h1 className="text-[32px] leading-tight font-black">
          <span className="text-makcha-navy-600 dark:text-makcha-yellow-500">막차</span> 지도
        </h1>
      </div>

      {/* 메인 이미지 */}
      <div className="relative mb-10">
        <img 
          src={owlImage}
          alt="로고" 
          className="w-44 h-auto mx-auto object-contain drop-shadow-lg"
        />
      </div>

      {/* 설명/슬로건 섹션 */}
      <div className="space-y-3">
        <h2 className="font-bold">
          지금 바로 시작하세요
        </h2>
        <p className="text-gray-500 dark:text-gray-400 break-keep leading-relaxed">
          더 이상 막차 놓칠 걱정하지 마세요.<br/>
          여러분의 <span className="font-bold text-makcha-navy-600 dark:text-makcha-yellow-500">확실한 귀가</span>를 책임져드립니다.
        </p>
      </div>
    </div>
  );
};