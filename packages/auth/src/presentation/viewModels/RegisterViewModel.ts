import { useDispatch } from 'react-redux'
import { UIState, useInjection } from '@app/common'
import { setAuthToken, setUser } from '@app/common'
import { useState } from 'react'
import { $ } from '../../domain/di/Types'
import { RegisterUseCase } from '../../domain/usecases/RegisterUseCase'

type RegisterViewModel = {
  state: RegisterState
  createUser: () => Promise<boolean>
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setConfirmPassword: (password: string) => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
}

type RegisterState = {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
} & UIState

const initialState: RegisterState = {
  loading: false,
  error: null,
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
}

const useRegisterViewModel = (): RegisterViewModel => {
  const useCase: RegisterUseCase = useInjection($.RegisterUseCase)
  const dispatch = useDispatch()
  const [state, setState] = useState<RegisterState>(initialState)

  const createUser: () => Promise<boolean> = async () => {
    setState((previous) => ({ ...previous, loading: true, error: null }))
    try {
      const session = await useCase.execute(
        state.email,
        state.firstName,
        state.lastName,
        state.password,
        state.confirmPassword
      )
      setState((previous) => ({ ...previous, loading: false, error: null }))
      dispatch(setAuthToken({ token: session.token }))
      dispatch(setUser({ user: session.user }))
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

  const setFirstName: (firstName: string) => void = async (firstName) => {
    setState((previous) => ({ ...previous, firstName: firstName }))
  }

  const setLastName: (lastName: string) => void = async (lastName) => {
    setState((previous) => ({ ...previous, lastName: lastName }))
  }

  return {
    state,
    createUser,
    setEmail,
    setPassword,
    setConfirmPassword,
    setFirstName,
    setLastName,
  }
}

export { useRegisterViewModel }
