import axios from "axios";
import type { OriginSearchItem } from "../types/search";

const key = import.meta.env.VITE_KAKAO_REST_API_KEY;
console.log("VITE_KAKAO_REST_API_KEY =", key);

type KakaoKeywordDoc = {
    id: string;
    place_name: string;
    road_address_name: string;
    address_name: string;
    x: string; // lng
    y: string; // lat
};

type KakaoKeywordResponse = {
    documents: KakaoKeywordDoc[];
};

export async function searchKakaoPlaces(query: string): Promise<OriginSearchItem[]> {
    const q = query.trim();
    if (!q) return [];

    const { data } = await axios.get<KakaoKeywordResponse>(
        "https://dapi.kakao.com/v2/local/search/keyword.json",
        {
            params: { query: q, size: 10 },
            headers: {
                Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
            },
        }
    );

    return (data.documents ?? []).map((d) => ({
        id: d.id,
        title: d.place_name,
        address: d.road_address_name || d.address_name,
        lat: Number(d.y),
        lng: Number(d.x),
    }));
}
