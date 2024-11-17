import { useDispatch } from 'react-redux'
import { UIState, useInjection } from '@app/common'
import { setAuthToken } from '@app/common'
import { useState } from 'react'
import { $ } from '../../domain/di/Types'
import { RegisterUseCase } from '../../domain/usecases/RegisterUseCase'

/**
 * Represents the view model for the user registration process.
 *
 * @notExported
 */
type RegisterViewModel = {
  /**
   * The current state of the registration process.
   */
  state: RegisterState
  /**
   * Creates a new user by dispatching actions to update the Redux store and set the authentication token.
   */
  createUser: () => Promise<boolean>
  /**
   * Sets the email field of the view model's state.
   */
  setEmail: (email: string) => void
  /**
   * Sets the password field of the view model's state.
   */
  setPassword: (password: string) => void
  /**
   * Sets the confirm password field of the view model's state.
   */
  setConfirmPassword: (password: string) => void
  /**
   * Sets the name field of the view model's state.
   */
  setName: (name: string) => void
}

/**
 * Represents the state of the registration process.
 *
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @property {string} confirmPassword - The user's confirmed password.
 * @property {string} name - The user's name.
 * @extends UIState
 * @notExported
 */
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

/**
 * Creates a RegisterViewModel that handles the user registration process.
 *
 * The RegisterViewModel provides the following properties:
 * - state: The current state of the view model, which includes the loading
 *   state, error state, email, password, confirm password, and name.
 * - createUser: A function that registers a new user with the provided email,
 *   name, password, and confirm password. If the registration is successful,
 *   it dispatches actions to update the Redux store and set the authentication
 *   token.
 * - setEmail: A function that sets the email field of the view model's state.
 * - setPassword: A function that sets the password field of the view model's state.
 * - setConfirmPassword: A function that sets the confirm password field of the view
 *   model's state.
 * - setName: A function that sets the name field of the view model's state.
 *
 * @return {RegisterViewModel} The RegisterViewModel instance.
 */
const useRegisterViewModel = (): RegisterViewModel => {
  const useCase: RegisterUseCase = useInjection($.RegisterUseCase)
  const dispatch = useDispatch()
  const [state, setState] = useState<RegisterState>(initialState)

  /**
   * Registers a new user and dispatches actions to update the Redux store and set the
   * authentication token.
   *
   * @returns {Promise<boolean>} A promise that resolves to true if the user was created
   *   successfully, or rejects with an error if the user creation failed.
   */
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

  /**
   * Sets the confirm password field of the view model's state.
   *
   * @param password The new confirm password.
   */
  const setConfirmPassword: (password: string) => void = async (password) => {
    setState((previous) => ({ ...previous, confirmPassword: password }))
  }

  /**
   * Sets the name field of the view model's state.
   *
   * @param name The new name.
   */
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
