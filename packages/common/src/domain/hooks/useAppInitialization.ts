import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setAuthToken, setUser } from '../store/AppSlice'
import { UserModel } from '../../data/models/UserModel'

const TOKEN_KEY = 'userAuthToken'
const USER_KEY = 'userData'

/**
 * Hook to initialize app authentication data from AsyncStorage
 * This should be called once when the app starts
 */
export const useAppInitialization = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load token and user data in parallel
        const [token, userData] = await Promise.all([
          AsyncStorage.getItem(TOKEN_KEY),
          AsyncStorage.getItem(USER_KEY)
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