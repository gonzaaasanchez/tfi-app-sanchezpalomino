import { useForgotPasswordViewModel } from '../../src/presentation/viewModels/ForgotPasswordViewModel'
import { useInjection } from '@app/common'
import { renderHook, act } from '@testing-library/react-hooks'
import { ForgotPasswordUseCase } from '../../src/domain/usecases/ForgotPasswordUseCase'

jest.mock('../../src/domain/usecases/ForgotPasswordUseCase')

describe('useForgotPasswordViewModel', () => {
  let forgotPasswordUseCaseMock: jest.Mocked<ForgotPasswordUseCase>

  beforeEach(() => {
    forgotPasswordUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<ForgotPasswordUseCase>
    ;(useInjection as jest.Mock).mockReturnValue(forgotPasswordUseCaseMock)
  })

  it('should update email', () => {
    const { result } = renderHook(() => useForgotPasswordViewModel())

    act(() => {
      result.current.setEmail('test@example.com')
    })

    expect(result.current.state.email).toBe('test@example.com')
  })

  it('should trigger forgot password process and handle success', async () => {
    forgotPasswordUseCaseMock.execute.mockResolvedValueOnce(undefined)

    const { result } = renderHook(() => useForgotPasswordViewModel())

    await act(async () => {
      result.current.setEmail('test@example.com')
    })

    await act(async () => {
      result.current.forgotPassword()
    })

    expect(forgotPasswordUseCaseMock.execute).toHaveBeenCalledWith(
      'test@example.com'
    )
    expect(result.current.state.loading).toBe(false)
    expect(result.current.state.error).toBe(null)
  })

  it('should handle forgot password error and set error state', async () => {
    forgotPasswordUseCaseMock.execute.mockRejectedValueOnce(
      new Error('Reset failed')
    )

    const { result } = renderHook(() => useForgotPasswordViewModel())

    await act(async () => {
      result.current.setEmail('test@example.com')
    })

    await act(async () => {
      result.current.forgotPassword()
    })

    expect(result.current.state.error).toBe('Reset failed')
    expect(result.current.state.loading).toBe(false)
  })
})
