import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export class AxiosInterceptor {
  static setup(instance: AxiosInstance): void {
    instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
      if (__DEV__) {
        const log = {
          method: request.method?.toUpperCase(),
          url: request.baseURL + request.url,
          headers: request.headers,
          body: request.data,
          params: request.params,
        }
        console.log('📤 Service Request:', JSON.stringify(log, null, 2))
      }
      return request
    })

    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (__DEV__) {
          const log = {
            method: response.config.method?.toUpperCase(),
            url: response.config.baseURL + response.config.url,
            status: response.status,
            headers: response.headers,
            data: response.data,
          }
          console.log('✅ Service Response:', JSON.stringify(log, null, 2))
        }
        return response
      },
      (error) => {
        if (__DEV__) {
          if (error.response) {
            const errorLog = {
              method: error.response.config.method?.toUpperCase(),
              url: error.config.baseURL + error.config.url,
              status: error.response.status,
              headers: error.response.headers,
              data: error.response.data,
            }
            console.log(
              '❌ Service Error Response:',
              JSON.stringify(errorLog, null, 2)
            )
          } else {
            const errorDetails = {
              message: error.message,
              code: error.code,
              name: error.name,
              stack: error.stack,
              isAxiosError: error.isAxiosError,
              request: error.request?._response || 'No request details',
              config: {
                url: error.config?.url,
                baseURL: error.config?.baseURL,
                method: error.config?.method,
                headers: error.config?.headers,
              },
            }

            console.log(
              '❌ Network Error Details:',
              JSON.stringify(errorDetails, null, 2)
            )
          }
        }

        // Extract error message from server response when HTTP error contains BaseResponse structure
        if (error.response && error.response.data) {
          const responseData = error.response.data
          if (responseData.success === false && responseData.message) {
            error.message = responseData.message
          }
        }

        return Promise.reject(error)
      }
    )
  }
}
