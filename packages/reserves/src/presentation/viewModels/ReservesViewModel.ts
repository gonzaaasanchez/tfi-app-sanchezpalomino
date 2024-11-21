import { UIState } from '@packages/common'
import { useState } from 'react'
import { ReserveStatus, ReserveType } from '../../data/models/local/Types'

type ReservesViewModel = {
  state: ReservesState
  setReserveType: (type: ReserveType) => void
  setReserveStatus: (status: ReserveStatus) => void
  getReserves: () => Promise<void>
}

type ReservesState = {
  selectedType: ReserveType
  selectedStatus: ReserveStatus
  reserves: string[]
} & UIState

const initialState: ReservesState = {
  loading: false,
  error: null,
  selectedType: 'sent',
  selectedStatus: 'confirmed',
  reserves: [],
}

const useReservesViewModel = (): ReservesViewModel => {
  const [state, setState] = useState<ReservesState>(initialState)

  const setReserveType = (type) => {
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

  const getReserves = async (): Promise<void> => {
    const delay = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms))

    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      //   const user = await useCase.execute(state.email, state.password)
      await delay(1500)

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

  return { state, setReserveType, setReserveStatus, getReserves }
}

export { useReservesViewModel }
