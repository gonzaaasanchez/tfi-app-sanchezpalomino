import { UIState, useInjection } from '@packages/common'
import { useState } from 'react'
import { ReserveStatus, ReserveType } from '../../data/models/local/Types'
import { GetReservesUseCase } from '../../domain/usecases/GetReservesUseCase'
import { $ } from '../../domain/di/Types'
import { ReservationModel } from '../../data/models/ReservationModel'

type ReservesViewModel = {
  state: ReservesState
  setReserveType: (type: ReserveType) => void
  setReserveStatus: (status: ReserveStatus) => void
  getReserves: () => Promise<void>
}

type ReservesState = {
  selectedType: ReserveType
  selectedStatus: ReserveStatus
  reserves: ReservationModel[]
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
  const getReservesUseCase: GetReservesUseCase = useInjection(
    $.GetReservesUseCase
  )

  const setReserveType: (status: ReserveType) => void = async (type) => {
    setState((previous) => ({
      ...previous,
      selectedType: type,
    }))
    getReserves()
  }

  const setReserveStatus: (status: ReserveStatus) => void = async (status) => {
    setState((previous) => ({
      ...previous,
      selectedStatus: status,
    }))
  }

  const getReserves = async (): Promise<void> => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      console.log('selectedType ' + state.selectedType)
      console.log('selectedStatus ' + state.selectedStatus)
      const reserves: ReservationModel[] = (
        await getReservesUseCase.execute(
          state.selectedType,
          state.selectedStatus
        )
      ).map((item) => new ReservationModel(item))

      setState((previous) => ({
        ...previous,
        loading: false,
        error: null,
        reserves: reserves,
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
