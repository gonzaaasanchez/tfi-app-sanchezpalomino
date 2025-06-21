import AsyncStorage from '@react-native-async-storage/async-storage'
import { Middleware } from '@reduxjs/toolkit'
import { setAuthToken, setUser } from './AppSlice'

const TOKEN_KEY = 'userAuthToken'
const USER_KEY = 'userData'

const appMiddleware: Middleware = () => (next) => async (action) => {
  const result = next(action)

  if (setAuthToken.match(action)) {
    if (action.payload.token === null) {
      await AsyncStorage.removeItem(TOKEN_KEY)
    } else {
      await AsyncStorage.setItem(TOKEN_KEY, action.payload.token)
    }
  }

  if (setUser.match(action)) {
    if (action.payload.user === null) {
      await AsyncStorage.removeItem(USER_KEY)
    } else {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(action.payload.user))
    }
  }

  return result
}

export { appMiddleware }
