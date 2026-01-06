import { useEffect, useState } from "react";

export const useIsMdUp = () => {
    const [isMdUp, setIsMdUp] = useState<boolean>(() => {
        if (typeof window === "undefined") return true;
        return window.matchMedia("(min-width: 768px)").matches;
    });

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 768px)");
        const handler = (e: MediaQueryListEvent) => setIsMdUp(e.matches);

        if (typeof mql.addEventListener === "function") {
            mql.addEventListener("change", handler);
            return () => mql.removeEventListener("change", handler);
        }
        mql.addListener(handler);
        return () => mql.removeListener(handler);
    }, []);

    return isMdUp;
};