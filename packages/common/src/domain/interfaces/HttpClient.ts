import { BaseResponse } from '../../data/http/BaseResponse'

interface HttpClient {
  get<T>(url: string, params?: unknown): Promise<BaseResponse<T>>
  post<T>(url: string, data?: unknown): Promise<BaseResponse<T>>
  put<T>(url: string, data?: unknown): Promise<BaseResponse<T>>
  delete<T>(url: string, params?: unknown): Promise<BaseResponse<T>>
}

export { HttpClient }
