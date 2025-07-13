import { createSlice } from '@reduxjs/toolkit'

type ReservesState = {
  lastStatusChange: number | null
}

const initialState: ReservesState = {
  lastStatusChange: null,
}

const reservesSlice = createSlice({
  name: 'reserves',
  initialState,
  reducers: {
    markStatusChanged: (state) => {
      state.lastStatusChange = Date.now()
    },
    clearStatusChange: (state) => {
      state.lastStatusChange = null
    },
  },
})

const reservesReducer = {
  reserves: reservesSlice.reducer,
}

type ReservesAppState = {
  reserves: ReturnType<typeof reservesSlice.reducer>
}

const { markStatusChanged, clearStatusChange } = reservesSlice.actions

export {
  reservesReducer,
  markStatusChanged,
  clearStatusChange,
  ReservesAppState,
}
