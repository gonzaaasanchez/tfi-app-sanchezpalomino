import AsyncStorage from '@react-native-async-storage/async-storage'
import { Middleware } from '@reduxjs/toolkit'
import { setAuthToken, setUser, StorageKeys } from './AppSlice'


const appMiddleware: Middleware = () => (next) => async (action) => {
  const result = next(action)

  if (setAuthToken.match(action)) {
    if (action.payload.token === null) {
      await AsyncStorage.removeItem(StorageKeys.TOKEN_KEY)
    } else {
      await AsyncStorage.setItem(StorageKeys.TOKEN_KEY, action.payload.token)
    }
  }

  if (setUser.match(action)) {
    if (action.payload.user === null) {
      await AsyncStorage.removeItem(StorageKeys.USER_KEY)
    } else {
      await AsyncStorage.setItem(StorageKeys.USER_KEY, JSON.stringify(action.payload.user))
    }
  }

  return result
}

export { appMiddleware }
