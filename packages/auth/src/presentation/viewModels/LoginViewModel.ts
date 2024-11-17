import { setAuthToken, UIState, useInjection } from '@app/common'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { $ } from '../../domain/di/Types'
import { LoginUseCase } from '../../domain/usecases/LoginUseCase'

/**
 * Represents the view model for the login feature.
 *
 * @notExported
 */
type LoginViewModel = {
  /**
   * The current state of the login view model.
   */
  state: LoginState
  /**
   * Triggers the login process.
   */
  login: () => void
  /**
   * Sets the email address in the view model's state.
   *
   * @param email The email address to set.
   */
  setEmail: (email: string) => void
  /**
   * Sets the password in the view model's state.
   *
   * @param password The password to set.
   */
  setPassword: (password: string) => void
}

/**
 * Represents the state of a login form.
 *
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @extends UIState
 * @notExported
 */
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

/**
 * Creates a LoginViewModel that handles user login functionality.
 *
 * The LoginViewModel provides the following properties:
 * - state: The current state of the view model, which includes the loading
 *   state, error state, and the user's email and password.
 * - login: A function that logs in the user, dispatching the appropriate
 *   actions to update the Redux store and set the authentication token.
 * - setEmail: A function that sets the email field of the view model's state.
 * - setPassword: A function that sets the password field of the view model's
 *   state.
 *
 * @return {LoginViewModel} The LoginViewModel instance.
 */
const useLoginViewModel = (): LoginViewModel => {
  const dispatch = useDispatch()
  const useCase: LoginUseCase = useInjection($.LoginUseCase)
  const [state, setState] = useState<LoginState>(initialState)

  /**
   * Logs in the user using the email and password from the state. If either
   * the email or password is blank, an alert is displayed with an error
   * message. Otherwise, the login function from the AuthRepository is called
   * to authenticate the user.
   */
  const login: () => void = async () => {
    setState((previous) => ({ ...previous, loading: true, error: null }))
    try {
      const user = await useCase.execute(state.email, state.password)
      setState((previous) => ({ ...previous, loading: false, error: null }))
      dispatch(setAuthToken({ token: user.token }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: error.message,
      }))
    }
  }

  /**
   * Sets the email field of the view model's state.
   *
   * @param email The new email address.
   */
  const setEmail: (email: string) => void = async (email) => {
    setState((previous) => ({ ...previous, email: email }))
  }

  /**
   * Sets the password field of the view model's state.
   *
   * @param password The new password.
   */
  const setPassword: (password: string) => void = async (password) => {
    setState((previous) => ({ ...previous, password: password }))
  }

  return { state, login, setEmail, setPassword }
}

export { useLoginViewModel }
