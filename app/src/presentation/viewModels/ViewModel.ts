import { AppState, UIState } from '@app/common'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

/**
 * Represents the view model for the router.
 *
 * @property {RouteState} state - The current state of the route.
 * @notExported
 */
type RouterViewModel = {
  state: RouteState
}

/**
 * Represents the state of a route, including whether the user is logged in.
 *
 * @property {boolean} isLoggedIn - Whether the user is logged in.
 * @extends UIState
 * @notExported
 */
type RouteState = {
  isLoggedIn: boolean
} & UIState

const initialState: RouteState = {
  loading: false,
  error: null,
  isLoggedIn: false,
}

/**
 * A custom hook that provides the state and loading state of the router.
 *
 * @returns {RouterViewModel} The state and loading state of the router.
 */
const useRouterViewModel = (): RouterViewModel => {
  const [state, setState] = useState<RouteState>(initialState)
  const userAuthToken = useSelector((state: AppState) => state.app.token)

  useEffect(() => {
    /**
     * Initialize the authentication state.
     *
     * If the userAuthToken is a promise, wait for it to resolve, otherwise use its value.
     * Set the loading state to true, then set the isLoggedIn state to true if the token is truthy,
     * and set the loading state to false.
     *
     * @returns {Promise<void>} A promise that resolves when the authentication state is initialized.
     */
    const initializeAuth = async (): Promise<void> => {
      setState((previous) => ({ ...previous, loading: true }))
      let token: string | null
      if (userAuthToken instanceof Promise) {
        token = await userAuthToken
      } else {
        token = userAuthToken
      }
      setState((previous) => ({
        ...previous,
        loading: false,
        isLoggedIn: token !== null,
      }))
    }
    initializeAuth()
  }, [userAuthToken])

  return { state }
}

export { useRouterViewModel }
