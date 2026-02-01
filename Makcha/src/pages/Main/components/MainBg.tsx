export default function MainBg() {
    return (
      <main className="hidden lg:flex flex-1 flex-col items-center justify-center transition-colors duration-200 bg-[#F8F9FA] dark:bg-gray-900 px-12">
        <div className="flex flex-col items-center max-w-xl">
          {/* 텍스트 시작줄 좌측 정렬 */}
          <div className="text-left w-full mb-16">
            <h1 className="text-5xl font-black leading-tight mb-6 text-gray-900 dark:text-white tracking-tight">
              앱 설치 필요 없는<br />
              귀가 비서, <span className="text-blue-600 dark:text-blue-400">막차</span> 알림
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
              목적지만 입력하세요. <br />
              출발 시간을 카톡으로 알려드립니다.
            </p>
          </div>
          
          {/* QR & 말풍선 */}
          <div className="flex flex-col items-center">
            <div className="mb-6 relative">
              <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-sm font-bold text-gray-500 dark:text-gray-300 italic">
                모바일에서 이용하기 더 편리해요!
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-gray-100 dark:border-gray-700 rotate-45 z-10"></div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-700">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://makcha.com" alt="QR" className="w-32 h-32 lg:w-36 lg:h-36" />
            </div>
          </div>
        </div>
      </main>
    );
  }