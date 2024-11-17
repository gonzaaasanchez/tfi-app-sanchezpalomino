import { UserModel } from '@app/common'

/**
 * Interface for an authentication repository.
 *
 * This interface defines the methods for authenticating users, creating new users, and initiating password reset.
 */
interface AuthRepository {
  /**
   * Authenticates a user with the provided email and password.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<UserModel>} A promise that resolves with the user's model if authentication is successful.
   */
  login(email: string, password: string): Promise<UserModel>
  /**
   * Creates a new user with the provided email, password, and name.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @param {string} name - The user's name.
   * @returns {Promise<UserModel>} A promise that resolves with the newly created user's model.
   */
  createUser(email: string, password: string, name: string): Promise<UserModel>
  /**
   * Initiates the password reset process for the user with the provided email.
   *
   * @param {string} email - The user's email address.
   * @returns {Promise<void>} A promise that resolves when the request is sent.
   */
  forgotPassword(email: string): Promise<void>
}

export default AuthRepository
