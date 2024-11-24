import axios, { AxiosInstance } from 'axios'
import { HttpClient } from '../../domain/interfaces/HttpClient'

class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async get<T>(url: string, params?: unknown): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params })
    return response.data
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data)
    return response.data
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data)
    return response.data
  }

  async delete<T>(url: string, params?: unknown): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, { params })
    return response.data
  }
}

export { AxiosHttpClient }
