import type { ReactNode } from "react";

type Props = {
    onClose: () => void;
    children: ReactNode;
};

export default function SaveReportPanelShell({ onClose, children }: Props) {
    return (
        <>
            <button
                type="button"
                aria-label="close save report"
                onClick={onClose}
                className="fixed inset-0 z-60 bg-black/10 dark:bg-black/30 md:inset-y-0 md:right-0 md:left-62"
            />

            <aside
                className="
                fixed inset-0 z-70
                h-dvh w-full bg-white
                shadow-[8px_0_20px_rgba(0,0,0,0.08)] dark:bg-makcha-navy-900
                md:inset-y-0 md:left-62 md:right-auto md:w-100
                md:border-r md:border-[#E2E2E2] md:dark:border-makcha-navy-800
            "
            >
                <div className="h-full overflow-y-auto px-5 pt-6 pb-10 pt-13 md:pt-15">
                    {children}
                </div>
            </aside>
        </>
    );
}
