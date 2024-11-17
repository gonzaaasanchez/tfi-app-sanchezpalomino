import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const TOKEN_KEY = 'userAuthToken'

/**
 * Represents the shape of the state managed by this slice.
 *
 * @property {string|null|Promise<string|null>} token - The authentication token.
 * @notExported
 */
type SliceState = {
  token: string | null | Promise<string | null>
}

const initialState: SliceState = {
  token: AsyncStorage.getItem(TOKEN_KEY),
}

/**
 * The app slice object.
 *
 * @notExported
 */
const appSlice = createSlice({
  name: 'AppSlice',
  initialState,
  reducers: {
    /**
     * Returns the current state of the slice.
     *
     * @returns {SliceState} The current state of the slice.
     */
    getAuthToken: (state) => {
      return state
    },
    /**
     * Updates the `token` property of the state with a new value.
     *
     * @param {SliceState} state - The current state of the slice.
     * @param {PayloadAction<string|null|Promise<string|null>>} action - The action object.
     * @returns {SliceState} The updated state of the slice.
     */
    setAuthToken: (
      state,
      action: PayloadAction<{
        token: string | null
      }>
    ) => {
      state.token = action.payload.token
    },
  },
})

/**
 * The app reducer object.
 */
const appReducer = {
  app: appSlice.reducer,
}

/**
 * Type definition for the application state.
 *
 * @typedef {Object} AppState
 * @property {ReturnType<typeof appSlice.reducer>} app - The state of the application slice.
 */
type AppState = {
  app: ReturnType<typeof appSlice.reducer>
}

const { getAuthToken, setAuthToken } = appSlice.actions

export { appReducer, getAuthToken, setAuthToken, AppState }
