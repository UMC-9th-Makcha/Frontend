export const DownloadHero = () => {
  return (
    <div className="flex flex-col items-center text-center pt-16 pb-12 px-4">
      {/* 상단 */}
      <div className="mb-16">
        <p className="text-xl text-makcha-navy-900 dark:text-gray-300 font-medium">
          막차 알림을 넘어선
        </p>
        <h1 className="text-4xl font-bold text-makcha-navy-900 dark:text-white mt-2">
          막차 지도
        </h1>
      </div>

      {/* 로고 */}
      <div className="mb-16">
        <img 
          src="/owl.png" 
          alt="로고" 
          className="w-48 h-auto mx-auto object-contain"
        />
      </div>

      {/* 정보 섹션 */}
      <div className="mb-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white leading-tight">
          지금 당장 다운로드
        </h2>
      </div>

      {/* 슬로건 */}
      <p className="text-lg text-makcha-navy-700 dark:text-makcha-navy-300">
        확실한 귀가를 책임져드립니다
      </p>
    </div>
  );
};