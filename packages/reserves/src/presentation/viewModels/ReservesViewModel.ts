import {
  UIState,
  useInjection,
  usePagination,
  PaginationModel,
  LoadFunction,
} from '@packages/common'
import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearStatusChange } from '../../domain/store/ReservesSlice'
import { GetReservesUseCase } from '../../domain/usecases/GetReservesUseCase'
import { $ } from '../../domain/di/Types'
import {
  ReservationModel,
  ReserveStatus,
  ReserveType,
} from '../../data/models/ReservationModel'

type ReservesViewModel = {
  state: ReservesState
  setReserveType: (type: ReserveType) => void
  setReserveStatus: (status: ReserveStatus) => void
  loadReserves: ({ reset }: { reset: boolean }) => Promise<void>
}

type ReservesState = {
  selectedType: ReserveType
  selectedStatus: ReserveStatus
  pagination: {
    items: ReservationModel[]
    pagination: PaginationModel
    loading: boolean
    loadingMore: boolean
  }
} & UIState

const initialState: ReservesState = {
  loading: false,
  error: null,
  selectedType: ReserveType.Owner,
  selectedStatus: ReserveStatus.Confirmed,
  pagination: {
    items: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    loading: false,
    loadingMore: false,
  },
}

const useReservesViewModel = (): ReservesViewModel => {
  const [state, setState] = useState<ReservesState>(initialState)
  const dispatch = useDispatch()
  const getReservesUseCase: GetReservesUseCase = useInjection(
    $.GetReservesUseCase
  )

  const lastStatusChange = useSelector(
    (state: any) => state.reserves?.lastStatusChange
  )

  useEffect(() => {
    if (state.selectedStatus && state.selectedType) {
      loadReserves({ reset: true })
    }
  }, [state.selectedStatus, state.selectedType])

  useEffect(() => {
    if (lastStatusChange) {
      loadReserves({ reset: true }).then(() => {
        dispatch(clearStatusChange())
      })
    }
  }, [lastStatusChange, dispatch])

  // Create load function for pagination hook
  const loadReservesFunction: LoadFunction<ReservationModel> = useCallback(
    async (page: number, limit: number) => {
      const response = await getReservesUseCase.execute(
        state.selectedType,
        state.selectedStatus,
        page,
        limit
      )

      return {
        items: response.items || [],
        pagination: response.pagination,
      }
    },
    [getReservesUseCase, state.selectedType, state.selectedStatus]
  )

  const pagination = usePagination(loadReservesFunction)

  const setReserveType = (type: ReserveType): void => {
    setState((previous) => ({
      ...previous,
      selectedType: type,
    }))
  }

  const setReserveStatus = (status: ReserveStatus): void => {
    setState((previous) => ({
      ...previous,
      selectedStatus: status,
    }))
  }

  const loadReserves = async ({ reset }: { reset: boolean }): Promise<void> => {
    try {
      await pagination.loadItems(reset)
    } catch (error) {
      setState((previous) => ({
        ...previous,
        error:
          error instanceof Error ? error.message : 'Error al cargar reservas',
      }))
    }
  }

  return {
    state: {
      ...state,
      pagination: {
        items: pagination.state.items,
        pagination: pagination.state.pagination,
        loading: pagination.state.loading,
        loadingMore: pagination.state.loadingMore,
      },
    },
    setReserveType,
    setReserveStatus,
    loadReserves,
  }
}

export { useReservesViewModel }
