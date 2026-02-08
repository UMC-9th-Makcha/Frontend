import { useQuery } from "@tanstack/react-query";
import { searchKakaoPlaces } from "../apis/kakaoPlaces";
import { useDebouncedValue } from "./useDebouncedValue";

export function useKakaoPlaceSearch(keyword: string, enabled: boolean) {
    const debounced = useDebouncedValue(keyword, 250);

    return useQuery({
        queryKey: ["kakaoPlaceSearch", debounced],
        queryFn: () => searchKakaoPlaces(debounced),
        enabled: enabled && debounced.trim().length >= 2, 
        staleTime: 30_000,
        retry: false,
    });
}