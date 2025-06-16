import { UIState, useInjection } from '@packages/common'
import { useState, useEffect } from 'react'
import { SearchResultsUseCase } from '../../domain/usecases/SearchResultsUseCase'
import { $ } from '../../domain/di/Types'
import { SearchResultModel } from '../../data/models/SearchResultModel'
import { useRoute, RouteProp } from '@react-navigation/native'
import {
  SearchCriteria,
  SortField,
  SortOrder,
} from '../../data/models/SearchCriteria'
import { PlaceType } from '../../data/models/ReservationModel'

type ReservationResultsScreenProps = {
  reservationResults: {
    searchCriteria: SearchCriteria
  }
}

export type SortOptionDatasource = {
  field: SortField
  label: string
}

export type OrderOptionDatasource = {
  field: SortOrder
  label: string
}

type ReservationResultsViewModel = {
  state: ReservationResultsState
  searchResults: () => Promise<void>
  setSortAndOrder: (field: SortField, order: SortOrder) => void
  setUserToRequest: (user: SearchResultModel) => void
}

type ReservationResultsState = {
  results: SearchResultModel[]
  searchCriteria: SearchCriteria
  sortOptions: readonly SortOptionDatasource[]
  sortOrderOptions: readonly OrderOptionDatasource[]
  userToRequest: SearchResultModel | null
} & UIState

const initialState: ReservationResultsState = {
  loading: false,
  error: null,
  results: [],
  searchCriteria: null,
  userToRequest: null,
  sortOptions: [
    {
      field: SortField.TOTAL_PRICE,
      label: 'reserveResultsScreen.sort.totalPrice',
    },
    {
      field: SortField.DISTANCE,
      label: 'reserveResultsScreen.sort.distance',
    },
    {
      field: SortField.REVIEWS,
      label: 'reserveResultsScreen.sort.reviews',
    },
  ] as const,
  sortOrderOptions: [
    {
      field: SortOrder.ASC,
      label: 'reserveResultsScreen.sort.asc',
    },
    {
      field: SortOrder.DESC,
      label: 'reserveResultsScreen.sort.desc',
    },
  ] as const,
}

const useReservationResultsViewModel = (): ReservationResultsViewModel => {
  const [state, setState] = useState<ReservationResultsState>(initialState)
  const searchResultsUseCase: SearchResultsUseCase = useInjection(
    $.SearchResultsUseCase
  )
  const route =
    useRoute<RouteProp<ReservationResultsScreenProps, 'reservationResults'>>()
  const { searchCriteria } = route.params

  useEffect(() => {
    setState((prev) => ({ ...prev, searchCriteria }))
  }, [])

  useEffect(() => {
    if (state.searchCriteria) {
      searchResults()
    }
  }, [state.searchCriteria])

  const searchResults = async (): Promise<void> => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      const results = await searchResultsUseCase.execute(state.searchCriteria)
      setState((previous) => ({
        ...previous,
        loading: false,
        error: null,
        results,
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: error.message,
      }))
    }
  }

  const setSortAndOrder = (field: SortField, order: SortOrder) => {
    const updatedCriteria = {
      ...state.searchCriteria,
      sortBy: { field, order },
    }
    setState((prev) => ({ ...prev, searchCriteria: updatedCriteria }))
  }

  const setUserToRequest = (user: SearchResultModel) => {
    setState((prev) => ({ ...prev, userToRequest: user }))
  }

  return { state, searchResults, setSortAndOrder, setUserToRequest }
}

export { useReservationResultsViewModel }
