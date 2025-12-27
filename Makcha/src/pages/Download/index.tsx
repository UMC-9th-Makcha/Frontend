export default function Download() {
    return (
      <div className="p-6 text-center space-y-8">
        <div className="pt-12">
          <div className="w-24 h-24 bg-makcha-yellow-500 rounded-3xl mx-auto mb-4 flex items-center justify-center text-4xl">🚌</div>
          <h1 className="text-2xl font-bold">막차 앱 설치하기</h1>
          <p className="text-makcha-navy-400 mt-2">홈 화면에 추가하여 더 빠르게 확인하세요.</p>
        </div>
        <button className="w-full py-4 bg-white text-makcha-navy-900 font-black rounded-2xl">
          지금 설치하기 (PWA)
        </button>
      </div>
    );
  }