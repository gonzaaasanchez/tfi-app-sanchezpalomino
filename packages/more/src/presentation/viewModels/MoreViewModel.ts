import { UIState } from '@app/common'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setAuthToken } from '@app/common'

type MoreViewModel = {
  state: MoreState
  logout: () => void
}
type MoreState = {} & UIState

const initialState: MoreState = {
  loading: false,
  error: null,
}

const useMoreViewModel = (): MoreViewModel => {
  const dispatch = useDispatch()
  const [state] = useState<MoreState>(initialState)

  const logout: () => void = async () => {
    dispatch(setAuthToken({ token: null }))
  }

  return { state: { ...state }, logout }
}

export { useMoreViewModel }
