import { UIState } from '@packages/common'
import { useState } from 'react'

type ReserveNewViewModel = {
  state: ReserveNewState
  createReserve: () => Promise<void>
}

type ReserveNewState = {} & UIState

const initialState: ReserveNewState = {
  loading: false,
  error: null,
}

const useReserveNewViewModel = (): ReserveNewViewModel => {
  const [state, setState] = useState<ReserveNewState>(initialState)

  const createReserve = async (): Promise<void> => {
    console.log('createReserve')
  }

  return {
    state,
    createReserve,
  }
}

export { useReserveNewViewModel }
