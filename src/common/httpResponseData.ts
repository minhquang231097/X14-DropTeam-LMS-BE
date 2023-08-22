export default class HttpResponseData {
  statusCode?: number;
  status?: number;
  message?: string;
  data?: any;
  count?: number;
  page?: number;
  total_page?: number;
  total?: number;

  constructor(message: string, statusCode: number, data: any = [], count?: number, total?: number, page?: number, total_page?: number) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data || [];
    this.count = count || undefined;
    this.page = page || undefined;
    this.total_page = total_page || undefined;
    this.total = total || undefined;
  }
}
