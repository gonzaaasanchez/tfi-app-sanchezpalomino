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
    firstName: string,
    lastName: string
  ): Promise<SessionModel> {
    return this.api.createUser(email, password, firstName, lastName)
  }

  async forgotPassword(email: string): Promise<void> {
    return this.api.forgotPassword(email)
  }

  async resetPassword(
    email: string,
    code: string,
    newPassword: string
  ): Promise<void> {
    return this.api.resetPassword(email, code, newPassword)
  }
}

export { AuthRepositoryImpl }
