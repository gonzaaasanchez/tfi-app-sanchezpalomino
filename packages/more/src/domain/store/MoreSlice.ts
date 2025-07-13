import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type MoreState = {
  lastPetChange: number | null
}

const initialState: MoreState = {
  lastPetChange: null,
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
  },
})

const moreReducer = {
  more: moreSlice.reducer,
}

type MoreAppState = {
  more: ReturnType<typeof moreSlice.reducer>
}

const { markPetChange, clearPetChange } = moreSlice.actions

export { moreReducer, markPetChange, clearPetChange, MoreAppState } 