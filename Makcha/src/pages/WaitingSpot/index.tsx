import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/common/loadingSpinner";

export default function WaitingSpot() {
  // 1. 타입을 string으로 받거나, 명시적으로 단언하여 에러를 방지합니다.
  const { type } = useParams() as { type: string };
  
  // 2. 잘못된 경로(예: /spot/abc)로 들어왔을 때를 대비한 방어 로직
  const isFirst = type === 'first';
  const isLast = type === 'last';
  
  // 첫차도 막차도 아닌 경로일 경우 대시보드로 안내하거나 제목을 기본값으로 설정
  const pageTitle = isFirst ? "첫차 대기 장소" : isLast ? "막차 대기 장소" : "대기 장소 확인";

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <header className="flex items-center mb-6 py-2">
        <button 
          onClick={() => window.history.back()} 
          className="mr-4 text-makcha-navy-400"
        >
          ←
        </button>
        <h1 className="text-xl font-bold text-white">{pageTitle}</h1>
      </header>

      {/* 실시간 위치 확인 영역 (피그마 3번 프레임 반영) */}
      <div className="flex-1 w-full bg-makcha-navy-800 rounded-3xl overflow-hidden border border-makcha-navy-600 relative">
        {/* 실제 지도가 들어갈 자리입니다. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <LoadingSpinner />
        </div>
      </div>

      {/* 하단 안내 문구 */}
      <div className="mt-6 p-4 bg-makcha-navy-900/50 rounded-2xl border border-dashed border-makcha-navy-600">
        <p className="text-sm text-makcha-navy-400 leading-relaxed text-center">
          지도상의 위치는 실시간 교통 상황에 따라<br />
          실제와 **최대 1~2분** 정도 차이가 날 수 있습니다.
        </p>
      </div>
    </div>
  );
}