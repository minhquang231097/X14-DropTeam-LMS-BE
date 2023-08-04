export default class HttpResponseData {
  statusCode?: number;
  status?: number;
  message?: string;
  data?: any = null;

  constructor(message: string, statusCode: number, data: any = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data || null;
  }
}
