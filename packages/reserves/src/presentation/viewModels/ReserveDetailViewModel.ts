import { UIState } from '@packages/common'
import { useState } from 'react'
import { ReservationModel } from '../../data/models/ReservationModel'

type ReserveDetailViewModel = {
  state: ReserveDetailState
  setCurrentReserve: (reserve: ReservationModel) => void
  acceptReserve: () => Promise<void>
  rejectReserve: () => Promise<void>
  cancelReserveCarer: () => Promise<void>
  cancelReserveOwner: () => Promise<void>
}

type ReserveDetailState = {
    currentReserve?: ReservationModel
} & UIState

const initialState: ReserveDetailState = {
  loading: false,
  error: null,
  currentReserve: null
}

const useReserveDetailViewModel = (): ReserveDetailViewModel => {
  const [state, setState] = useState<ReserveDetailState>(initialState)

  const setCurrentReserve: (reserve: ReservationModel) => void = async (reserve) => {
    setState((previous: ReserveDetailState) => ({
      ...previous,
      currentReserve: reserve,
    }))
  }

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
    setCurrentReserve,
    acceptReserve,
    rejectReserve,
    cancelReserveCarer,
    cancelReserveOwner,
  }
}

export { useReserveDetailViewModel }
