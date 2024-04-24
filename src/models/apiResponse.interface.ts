export interface ApiResponse<T> {
  responseId: string;
  statusCode: number;
  message: string;
  details: T;
}