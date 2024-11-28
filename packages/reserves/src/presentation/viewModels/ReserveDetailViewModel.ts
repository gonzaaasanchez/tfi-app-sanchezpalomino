import { UIState } from '@packages/common'
import { useState } from 'react'

type ReserveDetailViewModel = {
  state: ReserveDetailState
  acceptReserve: () => Promise<void>
  rejectReserve: () => Promise<void>
  cancelReserveCarer: () => Promise<void>
  cancelReserveOwner: () => Promise<void>
}

type ReserveDetailState = {} & UIState

const initialState: ReserveDetailState = {
  loading: false,
  error: null,
}

const useReserveDetailViewModel = (): ReserveDetailViewModel => {
  const [state, setState] = useState<ReserveDetailState>(initialState)

  const acceptReserve = async (): Promise<void> => {
    console.log('acceptReserve')
  }

  const rejectReserve = async (): Promise<void> => {
    console.log('rejectReserve')
  }

  const cancelReserveCarer = async (): Promise<void> => {
    console.log('cancelReserveCarer')
  }

  const cancelReserveOwner = async (): Promise<void> => {
    console.log('cancelReserveOwner')
  }

  return {
    state,
    acceptReserve,
    rejectReserve,
    cancelReserveCarer,
    cancelReserveOwner,
  }
}

export { useReserveDetailViewModel }
