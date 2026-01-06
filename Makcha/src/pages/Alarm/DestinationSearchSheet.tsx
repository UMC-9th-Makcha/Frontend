import { useEffect, useMemo, useState } from "react";
import { ORIGIN_SEARCH_MOCK, type OriginSearchItem } from "./mocks/originSearchMock";
import DestinationSearchSheetPC from "./PC/DestinationSearchSheet";
import DestinationSearchSheetMobile from "./mobile/DestinationSearchSheet";

type Props = {
    open: boolean;
    onClose: () => void;
    onSelectDestination: (item: OriginSearchItem) => void;
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

const DestinationSearchSheet = ({ open, onClose, onSelectDestination }: Props) => {
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
        <DestinationSearchSheetPC
            open={open}
            onClose={onClose}
            onSelectDestination={onSelectDestination}
            query={query}
            setQuery={setQuery}
            results={results}
            hasQuery={hasQuery}
        />
    ) : (
        <DestinationSearchSheetMobile
            open={open}
            onClose={onClose}
            onSelectDestination={onSelectDestination}
            query={query}
            setQuery={setQuery}
            results={results}
            hasQuery={hasQuery}
        />
    );
};

export default DestinationSearchSheet;
