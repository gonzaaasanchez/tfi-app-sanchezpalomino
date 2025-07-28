import AuthRepository from '../repository/AuthRepository'

class ResetPasswordUseCase {
  private authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(email: string, code: string, newPassword: string): Promise<void> {
    if (!email || !code || !newPassword) {
      throw new Error('forgotPasswordScreen.error.missingFields')
    }
    
    // Call the repository to reset password with code
    await this.authRepository.resetPassword(email, code, newPassword)
  }
}

export { ResetPasswordUseCase } 