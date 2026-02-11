function MainBg() {
  return (
    <main className="hidden lg:flex flex-1 flex-col items-center justify-center px-12 transition-colors duration-200">
      <div className="flex w-full max-w-xl flex-col items-center">
        
        {/* 헤더 영역 */}
        <div className="mb-16 w-full text-left">
          <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-gray-900 dark:text-white">
            앱 설치 필요 없는<br />
            귀가 비서, <span className="text-makcha-navy-600 dark:text-makcha-yellow-500">막차</span> 알림
          </h1>
          <h2 className="text-gray-500 dark:text-gray-400 font-medium text-lg">
            목적지만 입력하세요. <br />
            출발 시간을 카톡으로 알려드립니다.
          </h2>
        </div>
        
        {/* QR & 말풍선 컨테이너 */}
        <div className="flex flex-col items-center">
          
          {/* 말풍선 */}
          <div className="relative mb-6 filter drop-shadow-md dark:drop-shadow-none">
            {/* 몸통 */}
            <div className="relative z-10 rounded-full border border-transparent bg-white px-6 py-3 text-small font-bold italic text-gray-500 transition-all dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              모바일에서 이용하기 더 편리해요!
            </div>
            
            {/* 꼬리*/}
            <div className="absolute -bottom-2 left-1/2 z-0 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-transparent bg-white transition-all dark:border-gray-700 dark:bg-gray-800"></div>
          </div>

          {/* QR 코드 박스 */}
          <div className="rounded-[32px] border border-gray-100 bg-white p-4 shadow-xl transition-all dark:border-gray-700 dark:bg-gray-800">
            <img src="/qr.png" alt="QR코드" className="h-32 w-32 lg:h-36 lg:w-36" />
          </div>
          
        </div>
      </div>
    </main>
  );
}

export default MainBg