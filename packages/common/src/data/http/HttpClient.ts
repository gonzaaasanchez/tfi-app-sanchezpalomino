import axios, { AxiosInstance } from 'axios'
import { HttpClient } from '../../domain/interfaces/HttpClient'
import { BaseResponse } from './BaseResponse'
import { AxiosInterceptor } from './AxiosInterceptor'

class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    })
    AxiosInterceptor.setup(this.axiosInstance)
  }

  async get<T>(url: string, params?: unknown): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.get<BaseResponse<T>>(url, {
      params,
    })
    return response.data
  }

  async post<T>(url: string, data: unknown): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.post<BaseResponse<T>>(url, data)
    return response.data
  }

  async put<T>(url: string, data: unknown): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.put<BaseResponse<T>>(url, data)
    return response.data
  }

  async delete<T>(url: string, params?: unknown): Promise<BaseResponse<T>> {
    const response = await this.axiosInstance.delete<BaseResponse<T>>(url, {
      params,
    })
    return response.data
  }
}

export { AxiosHttpClient }
