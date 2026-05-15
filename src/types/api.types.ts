export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
}