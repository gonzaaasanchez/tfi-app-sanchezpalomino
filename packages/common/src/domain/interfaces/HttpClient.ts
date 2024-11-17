/**
 * Represents an HTTP client that can make requests to a server.
 */
interface HttpClient {
  /**
   * Makes a GET request to the specified URL with optional parameters.
   *
   * @param url The URL to make the request to.
   * @param params Optional parameters to include in the request.
   * @returns A promise that resolves to the response data.
   */
  get<T>(url: string, params?: unknown): Promise<T>
  /**
   * Makes a POST request to the specified URL with the provided data.
   *
   * @param url The URL to make the request to.
   * @param data The data to include in the request body.
   * @returns A promise that resolves to the response data.
   */
  post<T>(url: string, data: unknown): Promise<T>
  /**
   * Makes a PUT request to the specified URL with the provided data.
   *
   * @param url The URL to make the request to.
   * @param data The data to include in the request body.
   * @returns A promise that resolves to the response data.
   */
  put<T>(url: string, data: unknown): Promise<T>
  /**
   * Makes a DELETE request to the specified URL with optional parameters.
   *
   * @param url The URL to make the request to.
   * @param params Optional parameters to include in the request.
   * @returns A promise that resolves to the response data.
   */
  delete<T>(url: string, params?: unknown): Promise<T>
}

export { HttpClient }
