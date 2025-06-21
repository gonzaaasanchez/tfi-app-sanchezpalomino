import axios, { AxiosInstance } from 'axios'
import { HttpClient } from '../../domain/interfaces/HttpClient'
import { BaseResponse } from './BaseResponse'
import { AxiosInterceptor } from './AxiosInterceptor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageKeys } from '../../domain/store/AppSlice'

class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 30000,
    })
    AxiosInterceptor.setup(this.axiosInstance)
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const token = await AsyncStorage.getItem(StorageKeys.TOKEN_KEY)
    const headers: Record<string, string> = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    return headers
  }

  async get<T>(url: string, params?: unknown): Promise<BaseResponse<T>> {
    const headers = await this.getHeaders()
    const response = await this.axiosInstance.get<BaseResponse<T>>(url, {
      params,
      headers,
    })
    return response.data
  }

  async post<T>(url: string, data: unknown): Promise<BaseResponse<T>> {
    const headers = await this.getHeaders()
   
    if (data instanceof FormData) {
      delete headers['Content-Type']
    } else {
      headers['Content-Type'] = 'application/json'
    }

    const response = await this.axiosInstance.post<BaseResponse<T>>(url, data, {
      headers,
    })
    return response.data
  }

  async put<T>(url: string, data: unknown): Promise<BaseResponse<T>> {
    const headers = await this.getHeaders()

    if (data instanceof FormData) {
      delete headers['Content-Type']
    } else {
      headers['Content-Type'] = 'application/json'
    }

    const response = await this.axiosInstance.put<BaseResponse<T>>(url, data, {
      headers,
    })
    return response.data
  }

  async delete<T>(url: string, params?: unknown): Promise<BaseResponse<T>> {
    const headers = await this.getHeaders()
    const response = await this.axiosInstance.delete<BaseResponse<T>>(url, {
      params,
      headers,
    })
    return response.data
  }
}

export { AxiosHttpClient }
