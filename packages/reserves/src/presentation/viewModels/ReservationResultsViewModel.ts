import {
  UIState,
  useInjection,
  PaginationModel,
  ShowToast,
  useI18n,
  DateUtils,
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
import { CreateReservationUseCase } from '../../domain/usecases/CreateReservationUseCase'
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

type ReservationResultsState = {
  results: SearchResultModel[]
  pagination: PaginationModel
  searchCriteria: SearchCriteria
  sortOptions: readonly SortOptionDatasource[]
  sortOrderOptions: readonly OrderOptionDatasource[]
  userToRequest: SearchResultModel | null
  requestSent: boolean
  loadingMore: boolean
} & UIState

const initialState: ReservationResultsState = {
  loading: false,
  loadingMore: false,
  error: null,
  results: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
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
  searchResults: ({ reset }: { reset: boolean }) => Promise<void>
  setSortAndOrder: (field: SortField, order: SortOrder) => void
  setUserToRequest: (user: SearchResultModel) => void
  sendReservationRequest: () => Promise<void>
  onReachedBottom: () => void
  refreshResults: () => Promise<void>
}

const useReservationResultsViewModel = (): ReservationResultsViewModel => {
  const [state, setState] = useState<ReservationResultsState>(initialState)
  const searchResultsUseCase: SearchResultsUseCase = useInjection(
    $.SearchResultsUseCase
  )
  const createReservationUseCase: CreateReservationUseCase = useInjection(
    $.CreateReservationUseCase
  )
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
    }
  }, [searchCriteria])

  useEffect(() => {
    if (state.searchCriteria && !state.loading) {
      searchResults({ reset: true })
    }
  }, [state.searchCriteria])

  const searchResults = async ({
    reset,
  }: {
    reset: boolean
  }): Promise<void> => {
    try {
      if (state.loading || state.loadingMore) return

      if (!state.searchCriteria) {
        return
      }

      if (reset) {
        if (state.loading) return
        setState((previous) => ({
          ...previous,
          loading: true,
          error: null,
          requestSent: false,
        }))
        const response = await searchResultsUseCase.execute(
          state.searchCriteria,
          state.pagination.page,
          state.pagination.limit
        )
        setState((previous) => ({
          ...previous,
          results: response.items || [],
          pagination: response.pagination || {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          },
          loading: false,
        }))
      } else {
        if (
          !state.pagination ||
          state.pagination.page >= state.pagination.totalPages
        )
          return

        setState((previous) => ({ ...previous, loadingMore: true }))
        const nextPage = state.pagination.page + 1
        const response = await searchResultsUseCase.execute(
          state.searchCriteria,
          nextPage,
          state.pagination.limit
        )

        setState((previous) => ({
          ...previous,
          results: [...previous.results, ...(response.items || [])],
          pagination: response.pagination || previous.pagination,
          loadingMore: false,
        }))
      }
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        loadingMore: false,
        error:
          error instanceof Error ? error.message : 'Error al buscar resultados',
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle:
          error instanceof Error ? error.message : 'Error al buscar resultados',
      })
    }
  }

  const setSortAndOrder = (field: SortField, order: SortOrder) => {
    const updatedCriteria = {
      ...state.searchCriteria,
      sortBy: { field, order },
    }
    setState((prev) => ({ ...prev, searchCriteria: updatedCriteria }))
    searchResults({ reset: true })
  }

  const setUserToRequest = (user: SearchResultModel) => {
    setState((prev) => ({ ...prev, userToRequest: user }))
  }

  const onReachedBottom = (): void => {
    searchResults({ reset: false })
  }

  const refreshResults = async (): Promise<void> => {
    await searchResults({ reset: true })
  }

  const sendReservationRequest = async (): Promise<void> => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      await createReservationUseCase.execute({
        startDate: DateUtils.YYYYMMDD(state.searchCriteria.fromDate),
        endDate: DateUtils.YYYYMMDD(state.searchCriteria.toDate),
        careLocation: state.searchCriteria.placeType,
        caregiverId: state.userToRequest.caregiver._id,
        petIds: state.searchCriteria.selectedPets.map((pet) => pet.id),
        visitsPerDay: state.searchCriteria.visits,
        userAddressId:
          state.searchCriteria.placeType === PlaceType.OwnerHome &&
          state.searchCriteria.selectedAddress._id,
        distance: state.searchCriteria.maxDistance,
      })

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
        error:
          error instanceof Error ? error.message : 'Error al enviar solicitud',
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle:
          error instanceof Error ? error.message : 'Error al enviar solicitud',
      })
    }
  }

  return {
    state,
    searchResults,
    setSortAndOrder,
    setUserToRequest,
    sendReservationRequest,
    onReachedBottom,
    refreshResults,
  }
}

export { useReservationResultsViewModel }
