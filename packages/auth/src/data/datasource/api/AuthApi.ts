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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async forgotPassword(email: string): Promise<void> {
    await this.delay(2000)
    return Promise.resolve()
  }
}

export { AuthApi, AuthApiImpl }
