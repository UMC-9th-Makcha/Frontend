import { useEffect, useMemo, useState } from "react";
import { ORIGIN_SEARCH_MOCK, type OriginSearchItem } from "./mocks/originSearchMock";
import OriginSearchSheetPC from "./PC/OriginSearchSheet";
import OriginSearchSheetMobile from "./mobile/OriginSearchSheet";

type Props = {
    open: boolean;
    onClose: () => void;
    onSelectOrigin: (item: OriginSearchItem) => void;
};

// md 이상인지 체크 
const useIsMdUp = () => {
    const [isMdUp, setIsMdUp] = useState<boolean>(() => {
        if (typeof window === "undefined") return true;
        return window.matchMedia("(min-width: 768px)").matches;
    });

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 768px)");
        const handler = (e: MediaQueryListEvent) => setIsMdUp(e.matches);

        // 화면 크기 변경을 감지해서 PC/모바일 UI를 자동 전환
        if (typeof mql.addEventListener === "function") {
            mql.addEventListener("change", handler);
            return () => mql.removeEventListener("change", handler);
        } else {
            mql.addListener(handler);
            return () => mql.removeListener(handler);
        }
    }, []);

    return isMdUp;
};

const OriginSearchSheet = ({ open, onClose, onSelectOrigin }: Props) => {
    const isMdUp = useIsMdUp();
    const [query, setQuery] = useState("");

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return ORIGIN_SEARCH_MOCK.filter(
            (item) =>
                item.title.toLowerCase().includes(q) ||
                item.address.toLowerCase().includes(q)
        );
    }, [query]);

    const hasQuery = query.trim().length > 0;

    return isMdUp ? (
        <OriginSearchSheetPC
            open={open}
            onClose={onClose}
            onSelectOrigin={onSelectOrigin}
            query={query}
            setQuery={setQuery}
            results={results}
            hasQuery={hasQuery}
        />
    ) : (
        <OriginSearchSheetMobile
            open={open}
            onClose={onClose}
            onSelectOrigin={onSelectOrigin}
            query={query}
            setQuery={setQuery}
            results={results}
            hasQuery={hasQuery}
        />
    );
};

export default OriginSearchSheet;
