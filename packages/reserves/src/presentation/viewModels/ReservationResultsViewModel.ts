import {
  UIState,
  useInjection,
  PaginationModel,
  ShowToast,
  useI18n,
} from '@packages/common'
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
import { SendReservationRequestUseCase } from '../../domain/usecases/SendReservationRequestUseCase'

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

type ReservationResultsState = {
  results: SearchResultModel[]
  pagination: PaginationModel | null
  searchCriteria: SearchCriteria
  sortOptions: readonly SortOptionDatasource[]
  sortOrderOptions: readonly OrderOptionDatasource[]
  userToRequest: SearchResultModel | null
  requestSent: boolean
} & UIState

const initialState: ReservationResultsState = {
  loading: false,
  error: null,
  results: [],
  pagination: null,
  searchCriteria: null,
  userToRequest: null,
  sortOptions: [
    {
      field: SortField.PRICE,
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
  requestSent: false,
}

type ReservationResultsViewModel = {
  state: ReservationResultsState
  searchResults: () => Promise<void>
  setSortAndOrder: (field: SortField, order: SortOrder) => void
  setUserToRequest: (user: SearchResultModel) => void
  sendReservationRequest: () => Promise<void>
}

const useReservationResultsViewModel = (): ReservationResultsViewModel => {
  const [state, setState] = useState<ReservationResultsState>(initialState)
  const searchResultsUseCase: SearchResultsUseCase = useInjection(
    $.SearchResultsUseCase
  )
  const sendReservationRequestUseCase: SendReservationRequestUseCase =
    useInjection($.SendReservationRequestUseCase)
  const route =
    useRoute<RouteProp<ReservationResultsScreenProps, 'reservationResults'>>()
  const { searchCriteria } = route.params
  const { t } = useI18n()

  useEffect(() => {
    if (searchCriteria) {
      const convertedSearchCriteria = {
        ...searchCriteria,
        fromDate: new Date(searchCriteria.fromDate),
        toDate: new Date(searchCriteria.toDate),
      }
      setState((prev) => ({ ...prev, searchCriteria: convertedSearchCriteria }))
      searchResults(convertedSearchCriteria)
    }
  }, [searchCriteria])

  const searchResults = async (criteria?: SearchCriteria): Promise<void> => {
    const searchCriteriaToUse = criteria || state.searchCriteria
    if (!searchCriteriaToUse) return

    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      const response = await searchResultsUseCase.execute(searchCriteriaToUse)
      setState((previous) => ({
        ...previous,
        loading: false,
        error: null,
        results: response.items || [],
        pagination: response.pagination || null,
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: error.message,
        results: [],
        pagination: null,
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: error.message,
      })
    }
  }

  const setSortAndOrder = (field: SortField, order: SortOrder) => {
    const updatedCriteria = {
      ...state.searchCriteria,
      sortBy: { field, order },
    }
    setState((prev) => ({ ...prev, searchCriteria: updatedCriteria }))
    searchResults(updatedCriteria)
  }

  const setUserToRequest = (user: SearchResultModel) => {
    setState((prev) => ({ ...prev, userToRequest: user }))
  }

  const sendReservationRequest = async (): Promise<void> => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      await sendReservationRequestUseCase.execute()
      setState((previous) => ({
        ...previous,
        loading: false,
        error: null,
        requestSent: true,
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: error.message,
      }))
    }
  }

  return {
    state,
    searchResults,
    setSortAndOrder,
    setUserToRequest,
    sendReservationRequest,
  }
}

export { useReservationResultsViewModel }
