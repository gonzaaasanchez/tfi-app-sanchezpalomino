import { StringValidator, UserModel } from '@app/common'
import AuthRepository from '../repository/AuthRepository'

class RegisterUseCase {
  private authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(
    email: string,
    name: string,
    password: string,
    confirmPassword: string
  ): Promise<UserModel> {
    if (!name || !email || !password || !confirmPassword) {
      throw new Error('register-missing-fields')
    }
    if (!StringValidator.isValidEmail(email)) {
      throw new Error('register-invalid-email')
    }
    if (password !== confirmPassword) {
      throw new Error('register-password-not-match')
    }
    return await this.authRepository.createUser(email, password, name)
  }
}

export { RegisterUseCase }
