import type { DownloadButtonProps } from "../types/download";

export const DownloadButton = ({ onClick, isInstallable }: DownloadButtonProps) => {
  return (
    <div className="w-full">
      <button
        onClick={onClick}
        disabled={!isInstallable}
        className="
          w-full h-[54px] rounded-[16px]
          flex items-center justify-center
          text-title font-bold
          transition-all duration-200 active:scale-95
          
          disabled:opacity-50 disabled:cursor-not-allowed

          bg-makcha-navy-400 text-white

          dark:bg-makcha-yellow-500 dark:text-makcha-navy-900
        "
      >
        앱 다운로드
      </button>
      
      {!isInstallable && (
        <p className="mt-4 text-center text-caption italic break-keep" role="alert">
          * 현재 브라우저에서는 설치 버튼이 지원되지 않거나 이미 설치되었습니다.<br/>
          (아이폰/사파리는 '공유' 버튼 → '홈 화면에 추가'를 이용해 주세요)
        </p>
      )}
    </div>
  );
};