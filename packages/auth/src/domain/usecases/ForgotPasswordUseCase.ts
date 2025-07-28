import AuthRepository from '../repository/AuthRepository'

class ForgotPasswordUseCase {
  private authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(email: string): Promise<void> {
    if (!email) {
      throw new Error('forgotPasswordScreen.error.missingFields')
    }
    // Call the repository to send a password reset link to the user's email address.
    await this.authRepository.forgotPassword(email)
  }
}

export { ForgotPasswordUseCase }
