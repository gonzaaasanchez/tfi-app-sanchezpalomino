import { AuthApiImpl } from '../../src/data/datasource/api/AuthApi'
import { HttpClient } from '@app/common'

describe('AuthApiImpl', () => {
  let httpClientMock: jest.Mocked<HttpClient>
  let authApi: AuthApiImpl

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<HttpClient>

    authApi = new AuthApiImpl(httpClientMock)
  })

  it('should login and return a token', async () => {
    const mockResponse = { token: 'mocked_token' }
    httpClientMock.post.mockResolvedValueOnce(mockResponse)

    const response = await authApi.login('test@example.com', 'password123')

    expect(httpClientMock.post).toHaveBeenCalledWith('/login', {
      email: 'test@example.com',
      password: 'password123',
    })
    expect(response).toBe(mockResponse)
  })

  it('should handle login error', async () => {
    httpClientMock.post.mockRejectedValueOnce(new Error('Login failed'))

    await expect(
      authApi.login('test@example.com', 'password123')
    ).rejects.toThrow('Login failed')
    expect(httpClientMock.post).toHaveBeenCalledWith('/login', {
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('should create a user and return a token', async () => {
    const mockResponse = { token: 'mocked_token', id: 'mock_id' }
    httpClientMock.post.mockResolvedValueOnce(mockResponse)

    const response = await authApi.createUser(
      'test@example.com',
      'password123',
      'John Doe'
    )

    expect(httpClientMock.post).toHaveBeenCalledWith('/register', {
      email: 'test@example.com',
      password: 'password123',
    })
    expect(response).toBe(mockResponse)
  })

  it('should handle createUser error', async () => {
    httpClientMock.post.mockRejectedValueOnce(new Error('User creation failed'))

    await expect(
      authApi.createUser('test@example.com', 'password123', 'John Doe')
    ).rejects.toThrow('User creation failed')
    expect(httpClientMock.post).toHaveBeenCalledWith('/register', {
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('should resolve forgotPassword without calling HttpClient', async () => {
    await authApi.forgotPassword('test@example.com')

    expect(httpClientMock.post).not.toHaveBeenCalled()
  })
})
