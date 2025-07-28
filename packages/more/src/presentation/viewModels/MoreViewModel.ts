import { UIState, useInjection } from '@app/common'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setAuthToken, setUser } from '@app/common'
import { LogoutUseCase } from '../../domain/usecases/LogoutUseCase'
import { $ } from '../../domain/di/Types'

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
  const [state, setState] = useState<MoreState>(initialState)
  const logoutUseCase: LogoutUseCase = useInjection($.LogoutUseCase)

  const logout: () => void = async () => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))
    
    try {
      await logoutUseCase.execute()
      dispatch(setAuthToken({ token: null }))
      dispatch(setUser({ user: null }))
      setState((previous) => ({
        ...previous,
        loading: false,
        error: null,
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: error.message,
      }))
    }
  }

  return { state: { ...state }, logout }
}

export { useMoreViewModel }
