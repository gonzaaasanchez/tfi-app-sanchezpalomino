import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setAuthToken, setUser, StorageKeys } from '../store/AppSlice'
import { UserModel } from '../../data/models/UserModel'

export const useAppInitialization = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load token and user data in parallel
        const [token, userData] = await Promise.all([
          AsyncStorage.getItem(StorageKeys.TOKEN_KEY),
          AsyncStorage.getItem(StorageKeys.USER_KEY),
        ])

        // Set token if exists
        if (token) {
          dispatch(setAuthToken({ token }))
        }

        // Set user if exists
        if (userData) {
          const user = JSON.parse(userData) as UserModel
          dispatch(setUser({ user }))
        }
      } catch (error) {
        console.error('Error loading initial app data:', error)
      }
    }

    loadInitialData()
  }, [dispatch])
}
