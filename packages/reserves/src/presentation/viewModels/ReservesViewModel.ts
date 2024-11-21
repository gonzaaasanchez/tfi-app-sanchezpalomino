import { UIState } from '@packages/common'
import { useState } from 'react'
import { ReserveStatus, ReserveType } from '../../data/models/local/Types'

type ReservesViewModel = {
  state: ReservesState
  setReserveType: (type: ReserveType) => void
  setReserveStatus: (status: ReserveStatus) => void
}

type ReservesState = {
  selectedType: ReserveType
  selectedStatus: ReserveStatus
} & UIState

const initialState: ReservesState = {
  loading: false,
  error: null,
  selectedType: 'sent',
  selectedStatus: 'confirmed',
}

const useReservesViewModel = (): ReservesViewModel => {
  const [state, setState] = useState<ReservesState>(initialState)

  const setReserveType: (type: ReserveType) => void = (type) => {
    setState((previous) => ({
      ...previous,
      selectedType: type,
    }))
  }

  const setReserveStatus: (status: ReserveStatus) => void = (status) => {
    setState((previous) => ({
      ...previous,
      selectedStatus: status,
    }))
  }

  return { state, setReserveType, setReserveStatus }
}

export { useReservesViewModel }
