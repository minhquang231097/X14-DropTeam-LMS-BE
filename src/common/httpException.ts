export default class HttpException extends Error {
  statusCode?: number;
  status?: number;
  message: string;
  error?: any = undefined;

  constructor(message: string, statusCode: number, error: any = undefined) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.error = error || undefined;
  }
}
