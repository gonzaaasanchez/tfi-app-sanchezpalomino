import { StringValidator, SessionModel } from '@app/common'
import AuthRepository from '../repository/AuthRepository'

class RegisterUseCase {
  private authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string
  ): Promise<SessionModel> {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      throw new Error('register-missing-fields')
    }
    if (!StringValidator.isValidEmail(email)) {
      throw new Error('register-invalid-email')
    }
    if (!StringValidator.isValidPassword(password)) {
      throw new Error('register-invalid-password')
    }
    if (password !== confirmPassword) {
      throw new Error('register-password-not-match')
    }
    return await this.authRepository.createUser(
      email,
      password,
      firstName,
      lastName
    )
  }
}

export { RegisterUseCase }
