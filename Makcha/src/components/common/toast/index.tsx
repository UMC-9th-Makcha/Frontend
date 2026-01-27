import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import useToastStore, { type ToastType } from "../../../store/useToastStore";

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  error: <AlertCircle className="h-4 w-4 text-red-500" />,
  info: <Info className="h-4 w-4 text-blue-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
};

const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  return (

    <div className="fixed bottom-8 left-1/2 z-100 flex w-full -translate-x-1/2 flex-col gap-2 px-4 md:w-[400px] md:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-2xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-5 dark:border-white/10 dark:bg-makcha-navy-900/90"
        >
          {/* 왼쪽 아이콘 */}
          <div className="shrink-0">{iconMap[toast.type]}</div>

          {/* 메시지 */}
          <div className="flex-1 text-[16px] font-semibold text-gray-900 dark:text-gray-100">
            {toast.message}
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-1 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;