import axios, { AxiosInstance } from 'axios'
import { HttpClient } from '../../domain/interfaces/HttpClient'

/**
 * An implementation of the HttpClient interface using Axios.
 *
 * {@link HttpClient}
 */
class AxiosHttpClient implements HttpClient {
  /**
   * The Axios instance used to make HTTP requests.
   * @private
   */
  private axiosInstance: AxiosInstance

  /**
   * Initializes the Axios instance with a base URL and sets the Content-Type header to application/json.
   *
   * @param baseURL The base URL for the Axios instance.
   */
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * {@link HttpClient.get}
   */
  async get<T>(url: string, params?: unknown): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params })
    return response.data
  }

  /**
   * {@link HttpClient.post}
   */
  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data)
    return response.data
  }

  /**
   * {@link HttpClient.put}
   */
  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data)
    return response.data
  }

  /**
   * {@link HttpClient.delete}
   */
  async delete<T>(url: string, params?: unknown): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, { params })
    return response.data
  }
}

export { AxiosHttpClient }
