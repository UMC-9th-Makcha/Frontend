import { Star } from "lucide-react";

type Props = {
    titleBold: string;
    subtitle: string;
    onSave?: () => void;
};

const FrequentRoutesCard = ({ titleBold, subtitle, onSave }: Props) => {
    return (
        <div
            className="
                w-full
                rounded-[20px]
                border border-gray-200
                bg-white/70
                px-4 py-3
                shadow-sm
                backdrop-blur
                dark:border-white/10 dark:bg-makcha-navy-900/60
            "
        >
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onSave}
                    aria-label="자주 가는 경로로 저장"
                    className="
                        flex h-9 w-9 shrink-0 items-center justify-center
                        rounded-[14px]
                        bg-gray-100
                        hover:bg-gray-200
                        active:scale-95
                        transition
                        dark:bg-white/10 dark:hover:bg-white/20
                    "
                >
                    <Star className="h-5 w-5 text-gray-600 dark:text-white/80" />
                </button>

                {/* 텍스트 */}
                <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-gray-900 dark:text-white">
                        {titleBold}
                    </p>
                    <p className="mt-1 text-[12px] text-gray-500 dark:text-white/60">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FrequentRoutesCard;