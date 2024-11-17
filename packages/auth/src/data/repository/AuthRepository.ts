import AuthRepository from '../../domain/repository/AuthRepository'
import { AuthApi } from '../datasource/api/AuthApi'
import { UserModel } from '@app/common'

/**
 * Implementation of the AuthRepository interface.
 *
 * {@link AuthRepository}
 */
class AuthRepositoryImpl implements AuthRepository {
  private readonly api: AuthApi

  /**
   * Creates a new instance of the AuthRepositoryImpl class.
   *
   * @param api - The Auth API to use for making requests.
   */
  constructor(api: AuthApi) {
    this.api = api
  }

  /**
   * {@link AuthRepository.login}
   */
  async login(email: string, password: string): Promise<UserModel> {
    return this.api.login(email, password)
  }

  /**
   * {@link AuthRepository.createUser}
   */
  async createUser(
    email: string,
    password: string,
    name: string
  ): Promise<UserModel> {
    return this.api.createUser(email, password, name)
  }

  /**
   * {@link AuthRepository.forgotPassword}
   */
  async forgotPassword(email: string): Promise<void> {
    return this.api.forgotPassword(email)
  }
}

export { AuthRepositoryImpl }
