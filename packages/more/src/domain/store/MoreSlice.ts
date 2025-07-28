import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type MoreState = {
  lastPetChange: number | null
  lastAddressChange: number | null
}

const initialState: MoreState = {
  lastPetChange: null,
  lastAddressChange: null,
}

const moreSlice = createSlice({
  name: 'more',
  initialState,
  reducers: {
    markPetChange: (state) => {
      state.lastPetChange = Date.now()
    },
    clearPetChange: (state) => {
      state.lastPetChange = null
    },
    markAddressChange: (state) => {
      state.lastAddressChange = Date.now()
    },
    clearAddressChange: (state) => {
      state.lastAddressChange = null
    },
  },
})

const moreReducer = {
  more: moreSlice.reducer,
}

type MoreAppState = {
  more: ReturnType<typeof moreSlice.reducer>
}

const { markPetChange, clearPetChange, markAddressChange, clearAddressChange } =
  moreSlice.actions

export {
  moreReducer,
  markPetChange,
  clearPetChange,
  markAddressChange,
  clearAddressChange,
  MoreAppState,
}
