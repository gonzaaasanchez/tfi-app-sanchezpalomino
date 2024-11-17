import { HttpClient, UserModel } from '@app/common'

interface AuthApi {
  login(email: string, password: string): Promise<UserModel>
  createUser(email: string, password: string, name: string): Promise<UserModel>
  forgotPassword(email: string): Promise<void>
}

class AuthApiImpl implements AuthApi {
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async login(email: string, password: string): Promise<UserModel> {
    const response = await this.httpClient.post<UserModel>('/login', {
      email,
      password,
    })
    return response
  }

  async createUser(
    email: string,
    password: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    name: string
  ): Promise<UserModel> {
    const response = await this.httpClient.post<UserModel>('/register', {
      email,
      password,
    })
    return response
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  forgotPassword(email: string): Promise<void> {
    return Promise.resolve()
  }
}

export { AuthApi, AuthApiImpl }
