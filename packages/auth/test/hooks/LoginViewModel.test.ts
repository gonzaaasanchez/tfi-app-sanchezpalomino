import { useDispatch } from 'react-redux'
import { useLoginViewModel } from '../../src/presentation/viewModels/LoginViewModel'
import { setAuthToken, useInjection } from '@app/common'
import { renderHook, act } from '@testing-library/react-hooks'
import { LoginUseCase } from '../../src/domain/usecases/LoginUseCase'

jest.mock('../../src/domain/usecases/LoginUseCase')

describe('useLoginViewModel', () => {
  let loginUseCaseMock: jest.Mocked<LoginUseCase>
  let dispatchMock: jest.Mock

  beforeEach(() => {
    dispatchMock = jest.fn()
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock)

    loginUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<LoginUseCase>
    ;(useInjection as jest.Mock).mockReturnValue(loginUseCaseMock)
  })

  it('should update email and password', () => {
    const { result } = renderHook(() => useLoginViewModel())

    act(() => {
      result.current.setEmail('test@example.com')
    })

    act(() => {
      result.current.setPassword('password123')
    })

    expect(result.current.state.email).toBe('test@example.com')
    expect(result.current.state.password).toBe('password123')
  })

  it('should login and dispatch auth token', async () => {
    const mockUser = { token: 'mocked_token' }
    loginUseCaseMock.execute.mockResolvedValueOnce(mockUser)

    const { result } = renderHook(() => useLoginViewModel())

    await act(async () => {
      result.current.setEmail('test@example.com')
    })

    await act(async () => {
      result.current.setPassword('password123')
    })

    expect(result.current.state.email).toBe('test@example.com')
    expect(result.current.state.password).toBe('password123')

    await act(async () => {
      result.current.login()
    })

    expect(loginUseCaseMock.execute).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    )

    expect(dispatchMock).toHaveBeenCalledWith(setAuthToken(mockUser))
  })

  it('should handle login error and set error state', async () => {
    loginUseCaseMock.execute.mockRejectedValueOnce(new Error('Login failed'))

    const { result } = renderHook(() => useLoginViewModel())

    await act(async () => {
      result.current.setEmail('test@example.com')
      result.current.setPassword('password123')
    })

    await act(async () => {
      result.current.login()
    })

    expect(result.current.state.error).toBe('Login failed')
    expect(result.current.state.loading).toBe(false)
  })
})
