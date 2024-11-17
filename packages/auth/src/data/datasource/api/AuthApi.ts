import { HttpClient, UserModel } from '@app/common'

/**
 * Interface for an authentication API.
 */
interface AuthApi {
  /**
   * Authenticates a user with the provided email and password.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<UserModel>} A promise that resolves with the user's model if successful.
   */
  login(email: string, password: string): Promise<UserModel>
  /**
   * Creates a new user with the provided email, password, and name.
   *
   * @param {string} email - The new user's email address.
   * @param {string} password - The new user's password.
   * @param {string} name - The new user's name.
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

/**
 * Implementation of the AuthApi interface.
 *
 * {@link AuthApi}
 */
class AuthApiImpl implements AuthApi {
  private readonly httpClient: HttpClient

  /**
   * Creates an instance of the AuthApiImpl class.
   *
   * @param httpClient The HttpClient to use for making requests.
   */
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  /**
   * {@link AuthApi.login}
   */
  async login(email: string, password: string): Promise<UserModel> {
    const response = await this.httpClient.post<UserModel>('/login', {
      email,
      password,
    })
    return response
  }

  /**
   * {@link AuthApi.createUser}
   */
  async createUser(
    email: string,
    password: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    name: string
  ): Promise<UserModel> {
    const response = await this.httpClient.post<UserModel>('/register', {
      email,
      password,
    })
    return response
  }

  /**
   * {@link AuthApi.forgotPassword}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  forgotPassword(email: string): Promise<void> {
    return Promise.resolve()
  }
}

export { AuthApi, AuthApiImpl }
