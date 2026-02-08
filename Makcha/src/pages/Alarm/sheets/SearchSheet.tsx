import { useState } from "react";
import SearchSheetPC from "./PC/SearchSheetPC";
import SearchSheetMobile from "./mobile/SearchSheetMobile";
import { useIsMdUp } from "../hooks/useIsMdUp";
import type { OriginSearchItem } from "../types/search";
import { useKakaoPlaceSearch } from "../hooks/useKakaoPlacesSearch";

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    onSelect: (item: OriginSearchItem) => void;
    onPickCurrent: () => void;
};

const SearchSheet = ({ open, onClose, title, onSelect, onPickCurrent }: Props) => {
    const isMdUp = useIsMdUp();
    const [query, setQuery] = useState("");

    const { data } = useKakaoPlaceSearch(query, open);
    const results = data ?? [];
    const hasQuery = query.trim().length > 0;

    const sharedProps = {
        open,
        onClose,
        title,
        onSelect,
        onPickCurrent,
        query,
        setQuery,
        results,
        hasQuery,
    };

    return isMdUp ? <SearchSheetPC {...sharedProps} /> : <SearchSheetMobile {...sharedProps} />;
};

export default SearchSheet;