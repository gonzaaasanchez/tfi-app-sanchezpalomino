import { UserModel } from '@app/common'
import AuthRepository from '../repository/AuthRepository'

/**
 * Use case for handling user login functionality.
 */
class LoginUseCase {
  /**
   * Repository for authentication operations.
   *
   * @private
   */
  private authRepository: AuthRepository

  /**
   * Initializes the LoginUseCase instance with an AuthRepository.
   *
   * @param {AuthRepository} authRepository - The authentication repository.
   */
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  /**
   * Attempts to log in a user with the provided email and password.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<UserModel>} The authenticated user model.
   * @throws {Error} If email or password is missing.
   */
  async execute(email: string, password: string): Promise<UserModel> {
    if (!email || !password) {
      throw new Error('login-missing-fields')
    }
    // Call the repository to authenticate the user
    return await this.authRepository.login(email, password)
  }
}

export { LoginUseCase }
