import { setAuthToken, setUser, UIState, useInjection } from '@app/common'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { $ } from '../../domain/di/Types'
import { LoginUseCase } from '../../domain/usecases/LoginUseCase'

type LoginViewModel = {
  state: LoginState
  login: () => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
}

type LoginState = {
  email: string
  password: string
} & UIState

const initialState: LoginState = {
  loading: false,
  error: null,
  email: '',
  password: '',
}

const useLoginViewModel = (): LoginViewModel => {
  const dispatch = useDispatch()
  const useCase: LoginUseCase = useInjection($.LoginUseCase)
  const [state, setState] = useState<LoginState>(initialState)

  const login: () => void = async () => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))
    try {
      const session = await useCase.execute(state.email, state.password)
      setState((previous) => ({
        ...previous,
        loading: false,
        error: null,
      }))
      dispatch(setAuthToken({ token: session.token }))
      dispatch(setUser({ user: session.user }))
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

  return { state, login, setEmail, setPassword }
}

export { useLoginViewModel }
