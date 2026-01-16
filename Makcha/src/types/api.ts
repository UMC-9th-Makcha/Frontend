/* 백엔드 공통 응답 규격 */
export interface BaseResponse<T> {
    successCode: string;
    statusCode: number;
    message: string;
    result: T;
  }


/* 백엔드 에러 응답 규격 */
export interface ApiError {
    errorCode: string;
    message: string;
    path: string;
  }