import { UIState, useInjection } from '@app/common'
import { useState } from 'react'
import { $ } from '../../domain/di/Types'
import { ForgotPasswordUseCase } from '../../domain/usecases/ForgotPasswordUseCase'

type ForgotPasswordViewModel = {
  state: ForgotPasswordState
  forgotPassword: () => Promise<boolean>
  setEmail: (email: string) => void
}

type ForgotPasswordState = {
  email: string
  password: string
} & UIState

const initialState: ForgotPasswordState = {
  loading: false,
  error: null,
  email: '',
  password: '',
}

const useForgotPasswordViewModel = (): ForgotPasswordViewModel => {
  const useCase: ForgotPasswordUseCase = useInjection($.ForgotPasswordUseCase)
  const [state, setState] = useState<ForgotPasswordState>(initialState)

  const forgotPassword: () => Promise<boolean> = async () => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))
    try {
      await useCase.execute(state.email)
      setState((previous) => ({
        ...previous,
        loading: false,
      }))
      return true
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: error.message,
      }))
    }
  }

  const setEmail: (email: string) => void = async (email) => {
    setState((previous) => ({
      ...previous,
      email: email,
    }))
  }

  return { state, forgotPassword, setEmail }
}

export { useForgotPasswordViewModel }
