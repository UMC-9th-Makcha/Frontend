export default function Alarm() {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6 text-makcha-yellow-500">막차 알림 설정</h1>
        <div className="space-y-4">
          {['막차 10분 전', '막차 5분 전', '정시 도착'].map((item) => (
            <div key={item} className="p-4 bg-makcha-navy-800 rounded-xl flex justify-between items-center border border-makcha-navy-600">
              <span>{item}</span>
              <div className="w-12 h-6 bg-makcha-navy-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-makcha-yellow-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }