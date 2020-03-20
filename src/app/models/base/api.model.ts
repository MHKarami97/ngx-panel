export class Api<T> {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  data: T;
}
