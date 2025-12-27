export default function History() {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">최근 알림 내역</h1>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-makcha-navy-800/50 rounded-lg border-l-4 border-makcha-yellow-500">
              <p className="text-sm font-bold">막차 알림</p>
              <p className="text-xs text-makcha-navy-400">12월 27일 오후 11:30</p>
            </div>
          ))}
        </div>
      </div>
    );
  }