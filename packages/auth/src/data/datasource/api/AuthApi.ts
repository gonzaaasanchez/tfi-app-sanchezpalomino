import { HttpClient, SessionModel } from '@app/common'

interface AuthApi {
  login(email: string, password: string): Promise<SessionModel>
  createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<SessionModel>
  forgotPassword(email: string): Promise<void>
  resetPassword(email: string, code: string, newPassword: string): Promise<void>
}

class AuthApiImpl implements AuthApi {
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async login(email: string, password: string): Promise<SessionModel> {
    const response = await this.httpClient.post<SessionModel>('/auth/login', {
      email,
      password,
    })
    return response.data
  }

  async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<SessionModel> {
    const response = await this.httpClient.post<SessionModel>(
      '/auth/register',
      {
        email,
        password,
        firstName,
        lastName,
      }
    )
    return response.data
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await this.httpClient.post<void>('/auth/forgot-password', {
      email,
    })
    return response.data
  }

  async resetPassword(
    email: string,
    code: string,
    newPassword: string
  ): Promise<void> {
    const response = await this.httpClient.post<void>('/auth/reset-password', {
      email,
      code,
      newPassword,
    })
    return response.data
  }
}

export { AuthApi, AuthApiImpl }
