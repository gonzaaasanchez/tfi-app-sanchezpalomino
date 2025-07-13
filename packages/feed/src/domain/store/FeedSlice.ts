import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FeedState = {
  lastPostCreated: number | null
}

const initialState: FeedState = {
  lastPostCreated: null,
}

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    markPostCreated: (state) => {
      state.lastPostCreated = Date.now()
    },
    clearPostCreated: (state) => {
      state.lastPostCreated = null
    },
  },
})

const feedReducer = {
  feed: feedSlice.reducer,
}

type FeedAppState = {
  feed: ReturnType<typeof feedSlice.reducer>
}

const { markPostCreated, clearPostCreated } = feedSlice.actions

export { feedReducer, markPostCreated, clearPostCreated, FeedAppState }
