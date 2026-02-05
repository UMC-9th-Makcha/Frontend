import type { DownloadButtonProps } from "../types/download";

export const DownloadButton = ({ onClick, isInstallable }: DownloadButtonProps) => {
  return (
    <div className="w-full">
      <button
        onClick={onClick}
        disabled={!isInstallable}
        className="w-full py-4 bg-white dark:bg-makcha-navy-800 text-makcha-navy-900 dark:text-white font-black rounded-2xl border-2 border-makcha-navy-900 dark:border-makcha-navy-400 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        앱 다운로드 (PWA)
      </button>
      
      {!isInstallable && (
        <p className="text-xs text-makcha-navy-400 mt-4 italic" role="alert">
          * 현재 브라우저에서는 설치 버튼이 지원되지 않거나 이미 설치되었습니다.
          (아이폰은 공유 버튼을 이용해 주세요)
        </p>
      )}
    </div>
  );
};