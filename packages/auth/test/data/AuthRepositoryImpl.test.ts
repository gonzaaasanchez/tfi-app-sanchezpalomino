import { AuthRepositoryImpl } from '../../src/data/repository/AuthRepository'
import { AuthApi } from '../../src/data/datasource/api/AuthApi'

describe('AuthRepositoryImpl', () => {
  let authApiMock: jest.Mocked<AuthApi>
  let authRepository: AuthRepositoryImpl

  beforeEach(() => {
    authApiMock = {
      login: jest.fn(),
      createUser: jest.fn(),
      forgotPassword: jest.fn(),
    } as jest.Mocked<AuthApi>

    authRepository = new AuthRepositoryImpl(authApiMock)
  })

  it('should login via AuthApi', async () => {
    const mockResponse = { token: 'mocked_token' }
    authApiMock.login.mockResolvedValueOnce(mockResponse)

    const response = await authRepository.login(
      'test@example.com',
      'password123'
    )

    expect(authApiMock.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    )
    expect(response).toBe(mockResponse)
  })

  it('should handle login error from AuthApi', async () => {
    authApiMock.login.mockRejectedValueOnce(new Error('Login failed'))

    await expect(
      authRepository.login('test@example.com', 'password123')
    ).rejects.toThrow('Login failed')
    expect(authApiMock.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    )
  })

  it('should create user via AuthApi', async () => {
    const mockResponse = { token: 'mocked_token' }
    authApiMock.createUser.mockResolvedValueOnce(mockResponse)

    const response = await authRepository.createUser(
      'test@example.com',
      'password123',
      'John Doe'
    )

    expect(authApiMock.createUser).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
      'John Doe'
    )
    expect(response).toBe(mockResponse)
  })

  it('should handle createUser error from AuthApi', async () => {
    authApiMock.createUser.mockRejectedValueOnce(
      new Error('User creation failed')
    )

    await expect(
      authRepository.createUser('test@example.com', 'password123', 'John Doe')
    ).rejects.toThrow('User creation failed')
    expect(authApiMock.createUser).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
      'John Doe'
    )
  })

  it('should call forgotPassword via AuthApi', async () => {
    await authRepository.forgotPassword('test@example.com')

    expect(authApiMock.forgotPassword).toHaveBeenCalledWith('test@example.com')
  })

  it('should handle forgotPassword error from AuthApi', async () => {
    authApiMock.forgotPassword.mockRejectedValueOnce(
      new Error('Forgot password failed')
    )

    await expect(
      authRepository.forgotPassword('test@example.com')
    ).rejects.toThrow('Forgot password failed')
    expect(authApiMock.forgotPassword).toHaveBeenCalledWith('test@example.com')
  })
})
