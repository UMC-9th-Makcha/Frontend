import axios from "axios";
import { api } from "../../../apis/api";
import type { ApiError } from "../../../types/api";

export type RecentDestinationDto = {
    recentId: string;
    userId: string;
    title: string;
    roadAddress: string;
    detailAddress?: string;
    placeId: string;
    latitude: number;
    longitude: number;
    usedAt: string;
    createdAt: string;
};

type ApiResponse<T> = {
    successCode: string;
    statusCode: number;
    message: string;
    result: T;
};

type RecentDestinationsResult = {
    recentDestinations: RecentDestinationDto[];
};

type DeleteRecentDestinationResult = {
    recentId: string;
};

export async function fetchRecentDestinations(limit = 10) {
    try {
        const { data } = await api.get<ApiResponse<RecentDestinationsResult>>(
            "/api/recent-destinations",
            { params: { limit } }
        );
        return data.result.recentDestinations;
    } catch (e) {
        if (!axios.isAxiosError(e)) throw e;

        const errData = e.response?.data as ApiError | undefined;

        if (errData?.errorCode === "RECENT-404-001") return [];
        throw e;
    }
}

export async function deleteRecentDestination(recentId: string) {
    try {
        const { data } = await api.delete<ApiResponse<DeleteRecentDestinationResult>>(
            `/api/recent-destinations/${recentId}`
        );
        return data.result.recentId;
    } catch (e) {
        if (!axios.isAxiosError(e)) throw e;

        throw e;
    }
}
