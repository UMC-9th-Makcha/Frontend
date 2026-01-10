import { useEffect, useMemo, useState } from "react";
import { ORIGIN_SEARCH_MOCK } from "./mocks/originSearchMock";
import SearchSheetPC from "./PC/SearchSheetPC";
import SearchSheetMobile from "./mobile/SearchSheetMobile";
import { useIsMdUp } from "./hooks/useIsMdUp";
import type { OriginSearchItem } from "./types/search";

type Props = {
    open: boolean;
    onClose: () => void;
    title: string; // 출발지 | 도착지
    onSelect: (item: OriginSearchItem) => void;
};

const SearchSheet = ({ open, onClose, title, onSelect }: Props) => {
    const isMdUp = useIsMdUp();
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!open) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setQuery("");
    }, [open, title]);

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

    const sharedProps = {
        open,
        onClose,
        title,
        onSelect,
        query,
        setQuery,
        results,
        hasQuery,
    };

    return isMdUp ? (
        <SearchSheetPC {...sharedProps} />
    ) : (
        <SearchSheetMobile {...sharedProps} />
    );
};

export default SearchSheet;