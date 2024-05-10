export interface ResponseApi<T> {
  responseId: string;
  statusCode: number;
  message: string;
  details: T;
}