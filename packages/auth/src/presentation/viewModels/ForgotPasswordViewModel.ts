import { UIState, useInjection } from '@app/common'
import { useState } from 'react'
import { $ } from '../../domain/di/Types'
import { ForgotPasswordUseCase } from '../../domain/usecases/ForgotPasswordUseCase'

/**
 * Represents the view model for a forgot password page.
 *
 * @notExported
 */
type ForgotPasswordViewModel = {
  /**
   * The current state of the view model.
   */
  state: ForgotPasswordState

  /**
   * Sends a forgot password request for the given email and returns a promise that resolves to `true` if the request is successful.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the request is successful.
   */
  forgotPassword: () => Promise<boolean>

  /**
   * Sets the email field of the view model's state to a new email address.
   * @param {string} email - The new email address.
   */
  setEmail: (email: string) => void
}

/**
 * Represents the state of a forgot password view model.
 *
 * @property {string} email - The user's email address.
 * @property {string} password - The user's new password.
 * @extends {UIState} - Additional UI state properties.
 * @notExported
 */
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

/**
 * Creates a ForgotPasswordViewModel that handles the forgot password feature.
 *
 * The ForgotPasswordViewModel provides the following properties:
 * - state: The current state of the view model, which includes the loading
 *   state, error state, and the email.
 * - forgotPassword: A function that sends the forgot password request for
 *   the given email.
 * - setEmail: A function that sets the email field of the view model's state.
 *
 * @return {ForgotPasswordViewModel} The ForgotPasswordViewModel instance.
 */
const useForgotPasswordViewModel = (): ForgotPasswordViewModel => {
  const useCase: ForgotPasswordUseCase = useInjection($.ForgotPasswordUseCase)
  const [state, setState] = useState<ForgotPasswordState>(initialState)

  /**
   * Sends the forgot password request for the given email.
   *
   * Sets the loading state to true, then sets the error state to null. If the
   * AuthRepository call succeeds, it sets the loading state to false and
   * returns true. If the AuthRepository call fails, it sets the loading state to
   * false and sets the error state to the error message.
   *
   * @return {Promise<boolean>} A promise that resolves to true if the request
   *   was sent successfully, or rejects with an error if the request failed.
   */
  const forgotPassword: () => Promise<boolean> = async () => {
    setState((previous) => ({ ...previous, loading: true, error: null }))
    try {
      await useCase.execute(state.email)
      setState((previous) => ({ ...previous, loading: false }))
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

  return { state, forgotPassword, setEmail }
}

export { useForgotPasswordViewModel }
