import { ForgotPasswordUseCase } from '../../src/domain/usecases/ForgotPasswordUseCase'
import AuthRepository from '../../src/domain/repository/AuthRepository'

jest.mock('../../src/domain/repository/AuthRepository')

describe('ForgotPasswordUseCase', () => {
  let authRepositoryMock: jest.Mocked<AuthRepository>
  let forgotPasswordUseCase: ForgotPasswordUseCase

  beforeEach(() => {
    authRepositoryMock = {
      login: jest.fn(),
      createUser: jest.fn(),
      forgotPassword: jest.fn(),
    } as jest.Mocked<AuthRepository>

    forgotPasswordUseCase = new ForgotPasswordUseCase(authRepositoryMock)
  })

  it('should reset password via AuthRepository', async () => {
    const result: void = undefined as void
    authRepositoryMock.forgotPassword.mockResolvedValueOnce(result)

    const user = await forgotPasswordUseCase.execute('test@example.com')

    expect(authRepositoryMock.forgotPassword).toHaveBeenCalledWith(
      'test@example.com'
    )

    expect(user).toBe(result)
  })

  it('should handle reset password missing fields error', async () => {
    await expect(forgotPasswordUseCase.execute(null)).rejects.toThrow(
      'forgot-password-missing-fields'
    )
  })
})
