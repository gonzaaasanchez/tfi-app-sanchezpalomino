import { useRegisterViewModel } from '../../src/presentation/viewModels/RegisterViewModel'
import { useDispatch } from 'react-redux'
import { useInjection } from '@app/common'
import { renderHook, act } from '@testing-library/react-hooks'
import { setAuthToken } from '@app/common'
import { RegisterUseCase } from '../../src/domain/usecases/RegisterUseCase'

jest.mock('../../src/domain/usecases/RegisterUseCase')
jest.mock('react-redux')

describe('useRegisterViewModel', () => {
  let registerUserCaseMock: jest.Mocked<RegisterUseCase>
  let dispatchMock: jest.Mock

  beforeEach(() => {
    dispatchMock = jest.fn()
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock)

    registerUserCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<RegisterUseCase>
    ;(useInjection as jest.Mock).mockReturnValue(registerUserCaseMock)
  })

  it('should update email, password, confirm password, and name', () => {
    const { result } = renderHook(() => useRegisterViewModel())

    act(() => {
      result.current.setEmail('test@example.com')
    })

    act(() => {
      result.current.setPassword('password123')
    })

    act(() => {
      result.current.setConfirmPassword('password123')
    })

    act(() => {
      result.current.setName('Test User')
    })

    expect(result.current.state.email).toBe('test@example.com')
    expect(result.current.state.password).toBe('password123')
    expect(result.current.state.confirmPassword).toBe('password123')
    expect(result.current.state.name).toBe('Test User')
  })

  it('should create a user and dispatch auth token', async () => {
    const mockToken = { token: 'mocked_token' }
    registerUserCaseMock.execute.mockResolvedValueOnce(mockToken)

    const { result } = renderHook(() => useRegisterViewModel())

    await act(async () => {
      result.current.setEmail('test@example.com')
    })

    await act(async () => {
      result.current.setPassword('password123')
    })

    await act(async () => {
      result.current.setConfirmPassword('password123')
    })

    await act(async () => {
      result.current.setName('Test User')
    })

    await act(async () => {
      result.current.createUser()
    })

    expect(registerUserCaseMock.execute).toHaveBeenCalledWith(
      'test@example.com',
      'Test User',
      'password123',
      'password123'
    )

    expect(dispatchMock).toHaveBeenCalledWith(
      setAuthToken({ token: mockToken.token })
    )
  })

  it('should handle registration error and set error state', async () => {
    registerUserCaseMock.execute.mockRejectedValueOnce(
      new Error('Registration failed')
    )

    const { result } = renderHook(() => useRegisterViewModel())

    await act(async () => {
      result.current.setEmail('test@example.com')
      result.current.setPassword('password123')
      result.current.setName('Test User')
    })

    await act(async () => {
      result.current.createUser()
    })

    expect(result.current.state.error).toBe('Registration failed')
    expect(result.current.state.loading).toBe(false)
  })
})
