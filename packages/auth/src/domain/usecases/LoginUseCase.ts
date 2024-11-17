import { StringValidator, UserModel } from '@app/common'
import AuthRepository from '../repository/AuthRepository'

class LoginUseCase {
  private authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }
  async execute(email: string, password: string): Promise<UserModel> {
    if (!email || !password) {
      throw new Error('login-missing-fields')
    }
    if (!StringValidator.isValidEmail(email)) {
      throw new Error('login-invalid-email')
    }
    if (!StringValidator.isValidPassword(password)) {
      throw new Error('login-invalid-password')
    }
    return await this.authRepository.login(email, password)
  }
}

export { LoginUseCase }
