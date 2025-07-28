import { UIState, useInjection } from '@app/common'
import { useState } from 'react'
import { $ } from '../../domain/di/Types'
import { ForgotPasswordUseCase } from '../../domain/usecases/ForgotPasswordUseCase'
import { ResetPasswordUseCase } from '../../domain/usecases/ResetPasswordUseCase'

type ForgotPasswordViewModel = {
  state: ForgotPasswordState
  forgotPassword: () => Promise<boolean>
  resetPassword: () => Promise<boolean>
  setEmail: (email: string) => void
  setCode: (code: string) => void
  setNewPassword: (password: string) => void
  setConfirmPassword: (password: string) => void
  goToCodeStep: () => void
  goToPasswordStep: () => void
  goBackToEmailStep: () => void
}

type ForgotPasswordState = {
  email: string
  code: string
  newPassword: string
  confirmPassword: string
  currentStep: 'email' | 'code' | 'password'
} & UIState

const initialState: ForgotPasswordState = {
  loading: false,
  error: null,
  email: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
  currentStep: 'email',
}

const useForgotPasswordViewModel = (): ForgotPasswordViewModel => {
  const forgotPasswordUseCase: ForgotPasswordUseCase = useInjection($.ForgotPasswordUseCase)
  const resetPasswordUseCase: ResetPasswordUseCase = useInjection($.ResetPasswordUseCase)
  const [state, setState] = useState<ForgotPasswordState>(initialState)

  const forgotPassword: () => Promise<boolean> = async () => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))
    try {
      await forgotPasswordUseCase.execute(state.email)
      setState((previous) => ({
        ...previous,
        loading: false,
        currentStep: 'code',
      }))
      return true
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: error.message,
      }))
      return false
    }
  }

  const resetPassword: () => Promise<boolean> = async () => {
    if (state.newPassword !== state.confirmPassword) {
      setState((previous) => ({
        ...previous,
        error: 'forgotPasswordScreen.error.passwordsNotMatch',
      }))
      return false
    }

    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))
    try {
      await resetPasswordUseCase.execute(state.email, state.code, state.newPassword)
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
      return false
    }
  }

  const setEmail: (email: string) => void = (email) => {
    setState((previous) => ({
      ...previous,
      email: email,
    }))
  }

  const setCode: (code: string) => void = (code) => {
    setState((previous) => ({
      ...previous,
      code: code,
    }))
  }

  const setNewPassword: (password: string) => void = (password) => {
    setState((previous) => ({
      ...previous,
      newPassword: password,
    }))
  }

  const setConfirmPassword: (password: string) => void = (password) => {
    setState((previous) => ({
      ...previous,
      confirmPassword: password,
    }))
  }

  const goToCodeStep: () => void = () => {
    setState((previous) => ({
      ...previous,
      currentStep: 'code',
    }))
  }

  const goToPasswordStep: () => void = () => {
    setState((previous) => ({
      ...previous,
      currentStep: 'password',
    }))
  }

  const goBackToEmailStep: () => void = () => {
    setState((previous) => ({
      ...previous,
      currentStep: 'email',
    }))
  }

  return { 
    state, 
    forgotPassword, 
    resetPassword, 
    setEmail, 
    setCode, 
    setNewPassword, 
    setConfirmPassword,
    goToCodeStep,
    goToPasswordStep,
    goBackToEmailStep
  }
}

export { useForgotPasswordViewModel }
