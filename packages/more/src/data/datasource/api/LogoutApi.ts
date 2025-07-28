import { HttpClient } from '@app/common'

interface LogoutApi {
  logout(): Promise<void>
}

class LogoutApiImpl implements LogoutApi {
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async logout(): Promise<void> {
    await this.httpClient.post<void>('/auth/logout')
  }
}

export { LogoutApi, LogoutApiImpl } 