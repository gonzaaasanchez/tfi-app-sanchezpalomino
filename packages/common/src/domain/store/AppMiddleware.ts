import AsyncStorage from '@react-native-async-storage/async-storage'
import { Middleware } from '@reduxjs/toolkit'
import { setAuthToken } from './AppSlice'

const TOKEN_KEY = 'userAuthToken'

/**
 * Middleware that listens for actions set by `setAuthToken` and stores or removes
 * the token from AsyncStorage accordingly.
 *
 * @remarks
 * This middleware is used to store the auth token in the app's storage when the
 * `setAuthToken` action is dispatched. It is used in the app's store configuration.
 */
const appMiddleware: Middleware = () => (next) => async (action) => {
  const result = next(action)
  if (setAuthToken.match(action)) {
    if (action.payload.token === null) {
      await AsyncStorage.removeItem(TOKEN_KEY)
    } else {
      await AsyncStorage.setItem(TOKEN_KEY, action.payload.token)
    }
  }
  return result
}

export { appMiddleware }
