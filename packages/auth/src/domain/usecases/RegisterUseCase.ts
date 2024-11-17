import { UserModel } from '@app/common'
import AuthRepository from '../repository/AuthRepository'

/**
 * Represents a use case for registering a new user.
 */
class RegisterUseCase {
  /**
   * The authentication repository instance.
   *
   * @private
   */
  private authRepository: AuthRepository

  /**
   * Initializes the RegisterUseCase instance with an AuthRepository object.
   *
   * @param authRepository The authentication repository instance.
   */
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  /**
   * Attempts to register a new user with the provided credentials.
   *
   * @param email The user's email address.
   * @param name The user's name.
   * @param password The user's password.
   * @param confirmPassword The user's confirmed password.
   * @returns A Promise that resolves with the newly created user's model.
   * @throws {Error} If any of the required fields are missing.
   * @throws {Error} If the password and confirmed password do not match.
   */
  async execute(
    email: string,
    name: string,
    password: string,
    confirmPassword: string
  ): Promise<UserModel> {
    if (!name || !email || !password || !confirmPassword) {
      throw new Error('register-missing-fields')
    }
    if (password !== confirmPassword) {
      throw new Error('register-password-not-match')
    }
    // Call the repository to create the user
    return await this.authRepository.createUser(email, password, name)
  }
}

export { RegisterUseCase }
