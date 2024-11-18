import { useDispatch } from 'react-redux'
import { UIState, useInjection } from '@app/common'
import { setAuthToken } from '@app/common'
import { useState } from 'react'
import { $ } from '../../domain/di/Types'
import { RegisterUseCase } from '../../domain/usecases/RegisterUseCase'

type RegisterViewModel = {
  state: RegisterState
  createUser: () => Promise<boolean>
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setConfirmPassword: (password: string) => void
  setName: (name: string) => void
}

type RegisterState = {
  email: string
  password: string
  confirmPassword: string
  name: string
} & UIState

const initialState: RegisterState = {
  loading: false,
  error: null,
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
}

const useRegisterViewModel = (): RegisterViewModel => {
  const useCase: RegisterUseCase = useInjection($.RegisterUseCase)
  const dispatch = useDispatch()
  const [state, setState] = useState<RegisterState>(initialState)

  const createUser: () => Promise<boolean> = async () => {
    setState((previous) => ({ ...previous, loading: true, error: null }))
    try {
      const user = await useCase.execute(
        state.email,
        state.name,
        state.password,
        state.confirmPassword
      )
      setState((previous) => ({ ...previous, loading: false, error: null }))
      dispatch(setAuthToken({ token: user.token }))
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
    setState((previous) => ({ ...previous, email: email }))
  }

  const setPassword: (password: string) => void = async (password) => {
    setState((previous) => ({ ...previous, password: password }))
  }

  const setConfirmPassword: (password: string) => void = async (password) => {
    setState((previous) => ({ ...previous, confirmPassword: password }))
  }

  const setName: (name: string) => void = async (name) => {
    setState((previous) => ({ ...previous, name: name }))
  }

  return {
    state,
    createUser,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
  }
}

export { useRegisterViewModel }
