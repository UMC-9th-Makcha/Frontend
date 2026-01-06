import { useEffect, useState } from "react";

export const useScrollIndicator = (
    ref: React.RefObject<HTMLDivElement | null>
) => {
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const update = () => {
            const scrollLeft = el.scrollLeft;
            const scrollWidth = el.scrollWidth;
            const clientWidth = el.clientWidth;

            const maxScrollLeft = Math.max(1, scrollWidth - clientWidth);
            const visibleRatio = clientWidth / scrollWidth;

            const trackWidth = clientWidth;
            const indWidth = Math.max(40, trackWidth * visibleRatio);
            const maxLeft = Math.max(0, trackWidth - indWidth);

            const progress = Math.min(1, Math.max(0, scrollLeft / maxScrollLeft));
            const indLeft = maxLeft * progress;

            setIndicator({ left: indLeft, width: indWidth });
        };

        update();
        el.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [ref]);

    return indicator;
};
