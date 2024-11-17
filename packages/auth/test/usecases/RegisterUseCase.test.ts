import { RegisterUseCase } from '../../src/domain/usecases/RegisterUseCase'
import AuthRepository from '../../src/domain/repository/AuthRepository'
import { UserModel } from '@app/common'

jest.mock('../../src/domain/repository/AuthRepository')

describe('RegisterUseCase', () => {
  let authRepositoryMock: jest.Mocked<AuthRepository>
  let registerUseCase: RegisterUseCase

  beforeEach(() => {
    authRepositoryMock = {
      login: jest.fn(),
      createUser: jest.fn(),
      forgotPassword: jest.fn(),
    } as jest.Mocked<AuthRepository>

    registerUseCase = new RegisterUseCase(authRepositoryMock)
  })

  it('should register via AuthRepository', async () => {
    const mockUser: UserModel = { token: 'mocked_token', id: '1' }
    authRepositoryMock.createUser.mockResolvedValueOnce(mockUser)

    const user = await registerUseCase.execute(
      'test@example.com',
      'test',
      'password123',
      'password123'
    )

    expect(authRepositoryMock.createUser).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
      'test'
    )
    expect(user).toBe(mockUser)
  })

  it('should handle register missing fields error', async () => {
    await expect(
      registerUseCase.execute(null, null, null, null)
    ).rejects.toThrow('register-missing-fields')
  })
})
