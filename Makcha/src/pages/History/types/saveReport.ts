export type ApiResponse<T> = {
    successCode: string;
    statusCode: number;
    message: string;
    result: T;
};

export type SaveReportChartItem = {
    month: string;       
    savedAmount: number; 
    totalCount: number;  
    highlight: boolean;  
};

export type SaveReportItem = {
    notificationHistoryId: string;
    originName: string;
    destinationName: string;
    departureDatetime: string; 
    arrivalDatetime: string;  
    savedFareWon: number;
};

export type SaveReportsResult = {
    selectedMonth: string;
    range: { from: string; to: string };
    chart: SaveReportChartItem[];
    items: SaveReportItem[];
};
