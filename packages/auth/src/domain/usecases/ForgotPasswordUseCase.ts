import AuthRepository from '../repository/AuthRepository'

/**
 * Represents a use case for handling forgot password requests.
 */
class ForgotPasswordUseCase {
  /**
   * The authentication repository instance.
   *
   * @private
   */
  private authRepository: AuthRepository

  /**
   * Initializes a new instance of the ForgotPasswordUseCase class.
   *
   * @param {AuthRepository} authRepository The authentication repository instance.
   */
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  /**
   * Starts the password reset process for the given email.
   *
   * @throws {Error} forgot-password-missing-fields If the email is empty.
   * @param email The email to start the password reset process for.
   * @returns A promise that resolves when the request is sent.
   */
  async execute(email: string): Promise<void> {
    if (!email) {
      throw new Error('forgot-password-missing-fields')
    }
    // Call the repository to send a password reset link to the user's email address.
    await this.authRepository.forgotPassword(email)
  }
}

export { ForgotPasswordUseCase }
