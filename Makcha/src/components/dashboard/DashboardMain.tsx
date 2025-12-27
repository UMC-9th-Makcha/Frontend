export default function DashboardMain() {
    return (
      <div className="bg-makcha-navy-800 p-6 rounded-3xl border border-makcha-navy-600 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <span className="text-makcha-yellow-500 font-bold">실시간 막차 정보</span>
          <span className="text-xs text-makcha-navy-400">오후 11:45 기준</span>
        </div>
        <div className="text-center py-8">
          <h2 className="text-4xl font-black mb-2">05:20</h2>
          <p className="text-makcha-navy-200">막차 도착까지 남은 시간</p>
        </div>
        <button className="w-full py-3 bg-makcha-yellow-500 text-makcha-navy-900 font-bold rounded-xl">
          상세 경로 보기
        </button>
      </div>
    );
  }