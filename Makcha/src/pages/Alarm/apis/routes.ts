import { api } from "../../../apis/api";
import type { OriginSearchItem } from "../types/search";
import type { Candidate } from "../types/candidate";

type BaseResponse<T> = {
    successCode: string;
    statusCode: number;
    message: string;
    result: T;
};

export type RouteCandidatesPointBody = {
    lat: number;
    lng: number;
    title: string;
    roadAddress: string;
    detailAddress: string;
};

const normalizeText = (v?: string | null) => (v ?? "").trim();

export const toCandidatesPointBody = (p: OriginSearchItem): RouteCandidatesPointBody => {
    if (typeof p.lat !== "number" || typeof p.lng !== "number") {
        throw new Error("출발/도착 좌표(lat/lng)가 없습니다.");
    }

    const title = normalizeText(p.title);
    const roadAddressRaw = normalizeText(p.roadAddress) || normalizeText(p.address);
    const detailAddress = normalizeText(p.detailAddress);

    if (!title) throw new Error("출발/도착 title(장소명)이 없습니다.");

    const roadAddress = roadAddressRaw || "주소 정보 없음";

    if (!roadAddressRaw) {
        console.warn("[routes] roadAddress missing. fallback applied:", {
            id: p.id,
            title: p.title,
            roadAddress: p.roadAddress,
            address: p.address,
        });
    }

    return { lat: p.lat, lng: p.lng, title, roadAddress, detailAddress };
};

export async function fetchCandidates(body: {
    origin: RouteCandidatesPointBody;
    destination: RouteCandidatesPointBody;
}) {
    const res = await api.post<BaseResponse<{ candidates: Candidate[] }>>(
        "/api/routes/candidates",
        body
    );
    return res.data.result.candidates;
}

export type PolylinePoint = { lat: number; lng: number };

export type PolylinePath = {
    class: number;
    type: number;
    map_type?: string;
    order?: number;
    points: PolylinePoint[];
};

export type RoutePolylinesResult = {
    route_token: string;
    map_object: string;
    paths: PolylinePath[];
    boundary?: { top: number; left: number; bottom: number; right: number };
};

export async function fetchRoutePolylines(routeToken: string): Promise<RoutePolylinesResult> {
    const { data } = await api.get<BaseResponse<RoutePolylinesResult>>(
        `/api/routes/polylines/${encodeURIComponent(routeToken)}`
    );
    return data.result;
}