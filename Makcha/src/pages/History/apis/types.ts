import type { CandidateStep } from "../../Alarm/types/candidate";

export type BaseResponse<T> = {
    successCode: string;
    statusCode: number;
    message: string;
    result: T;
};

export type AlertDetailResult = {
    is_optimal: boolean;
    lines: string[];
    total_duration_min: number;
    transfer_count: number;
    walking_time_min: number;
    minutes_left: number;
    departure_at?: string;
    arrival_at?: string;
    route_id?: string | null;
    route_token?: string | null;
    steps: CandidateStep[];
};
