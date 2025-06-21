import AuthRepository from '../../domain/repository/AuthRepository'
import { AuthApi } from '../datasource/api/AuthApi'
import { SessionModel } from '@app/common'

class AuthRepositoryImpl implements AuthRepository {
  private readonly api: AuthApi

  constructor(api: AuthApi) {
    this.api = api
  }

  async login(email: string, password: string): Promise<SessionModel> {
    return this.api.login(email, password)
  }

  async createUser(
    email: string,
    password: string,
    name: string
  ): Promise<SessionModel> {
    return this.api.createUser(email, password, name)
  }

  async forgotPassword(email: string): Promise<void> {
    return this.api.forgotPassword(email)
  }
}

export { AuthRepositoryImpl }
