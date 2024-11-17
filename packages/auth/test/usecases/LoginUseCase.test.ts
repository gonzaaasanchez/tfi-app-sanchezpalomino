import AuthRepository from '../../src/domain/repository/AuthRepository'
import { LoginUseCase } from '../../src/domain/usecases/LoginUseCase'
import { UserModel } from '@app/common'

jest.mock('../../src/domain/repository/AuthRepository')

describe('LoginUseCase', () => {
  let authRepositoryMock: jest.Mocked<AuthRepository>
  let loginUseCase: LoginUseCase

  beforeEach(() => {
    authRepositoryMock = {
      login: jest.fn(),
      createUser: jest.fn(),
      forgotPassword: jest.fn(),
    } as jest.Mocked<AuthRepository>

    loginUseCase = new LoginUseCase(authRepositoryMock)
  })

  it('should login via AuthRepository', async () => {
    const mockUser: UserModel = { token: 'mocked_token' }
    authRepositoryMock.login.mockResolvedValueOnce(mockUser)

    const user = await loginUseCase.execute('test@example.com', 'password123')

    expect(authRepositoryMock.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    )
    expect(user).toBe(mockUser)
  })

  it('should handle login missing fields error', async () => {
    await expect(loginUseCase.execute(null, null)).rejects.toThrow(
      'login-missing-fields'
    )
  })
})
