export type CandidatePoint = { lat: number; lng: number };

export type CandidateStation = {
    name: string;
    lat: number;
    lng: number;
    id: number;
};

export type CandidateStep = {
    type: string;
    points: CandidatePoint[];
    section_time: number;
    distance: number;
    station_count: number;

    from: CandidateStation;
    to: CandidateStation;

    bus_numbers: string[];
    bus_types: number[];

    subway_lines: string[];
    way: string;
    way_code: number;
    subway_type: number | null;
};

export type Candidate = {
    candidate_key: string;
    route_token: string;
    is_optimal: boolean;
    tags: string[];
    card: {
        traveled_time: number;
        transfer_count: number;
        public_transit_fare: number;
        walk_time: number;
        deadline_at: string;
        minutes_left: number;
    };
    detail: {
        steps: CandidateStep[];
    };
};