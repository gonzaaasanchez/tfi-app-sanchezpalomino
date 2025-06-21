import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserModel } from '../../data/models/UserModel'

const TOKEN_KEY = 'userAuthToken'
const USER_KEY = 'userData'

type SliceState = {
  token: string | null
  user: UserModel | null
}

const initialState: SliceState = {
  token: null,
  user: null,
}

const appSlice = createSlice({
  name: 'AppSlice',
  initialState,
  reducers: {
    getAuthToken: (state) => {
      return state
    },
    setAuthToken: (
      state,
      action: PayloadAction<{
        token: string | null
      }>
    ) => {
      state.token = action.payload.token
    },
    getUser: (state) => {
      return state
    },
    setUser: (
      state,
      action: PayloadAction<{
        user: UserModel | null
      }>
    ) => {
      state.user = action.payload.user
    },
  },
})

const appReducer = {
  app: appSlice.reducer,
}

type AppState = {
  app: ReturnType<typeof appSlice.reducer>
}

const { getAuthToken, setAuthToken, getUser, setUser } = appSlice.actions

export { appReducer, getAuthToken, setAuthToken, getUser, setUser, AppState }
