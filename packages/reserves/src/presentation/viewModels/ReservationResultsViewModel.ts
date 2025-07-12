import {
  UIState,
  useInjection,
  useI18n,
  DateUtils,
  usePagination,
  LoadFunction,
  SelectableOption,
  parseSpanishNumber,
} from '@packages/common'
import { useState, useEffect, useCallback } from 'react'
import { $ } from '../../domain/di/Types'
import { SearchResultModel } from '../../data/models/SearchResultModel'
import { useRoute, RouteProp } from '@react-navigation/native'
import {
  SearchCriteria,
  SortField,
  SortOrder,
} from '../../data/models/SearchCriteria'
import { CreateReservationUseCase } from '../../domain/usecases/CreateReservationUseCase'
import { SearchResultsUseCase } from '../../domain/usecases/SearchResultsUseCase'
import { PaginationModel } from '@packages/common'
import { useStripePayment } from '../hooks/useStripePayment'
import { STRIPE_CONFIG } from '../../config/stripe'

type ReservationResultsScreenProps = {
  reservationResults: {
    searchCriteria: SearchCriteria
  }
}

type ReservationResultsState = {
  searchCriteria: SearchCriteria
  sortOptions: readonly SelectableOption<SortField>[]
  sortOrderOptions: readonly SelectableOption<SortOrder>[]
  userToRequest: SearchResultModel | null
  requestSent: boolean
  pagination: {
    items: SearchResultModel[]
    pagination: PaginationModel
    loading: boolean // Pagination loading
    loadingMore: boolean
  }
} & UIState

const initialState: ReservationResultsState = {
  loading: false,
  error: null,
  searchCriteria: null,
  userToRequest: null,
  sortOptions: [
    {
      key: SortField.PRICE,
      label: 'reserveResultsScreen.sort.totalPrice',
    },
    {
      key: SortField.DISTANCE,
      label: 'reserveResultsScreen.sort.distance',
    },
    {
      key: SortField.REVIEWS,
      label: 'reserveResultsScreen.sort.reviews',
    },
  ] as const,
  sortOrderOptions: [
    {
      key: SortOrder.ASC,
      label: 'reserveResultsScreen.sort.asc',
    },
    {
      key: SortOrder.DESC,
      label: 'reserveResultsScreen.sort.desc',
    },
  ] as const,
  requestSent: false,
  pagination: {
    items: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    loading: false,
    loadingMore: false,
  },
}

type ReservationResultsViewModel = {
  state: ReservationResultsState
  searchResults: ({ reset }: { reset: boolean }) => Promise<void>
  setSortAndOrder: (field: SortField, order: SortOrder) => void
  setUserToRequest: (user: SearchResultModel) => void
  sendReservationRequest: () => Promise<void>
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

  const {
    loading: stripeLoading,
    initializeStripe,
    processPayment,
  } = useStripePayment({
    onPaymentSuccess: () => {
      setState((previous) => ({
        ...previous,
        loading: false,
        requestSent: true,
      }))
    },
    onPaymentError: (error) => {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: error,
      }))
    },
  })

  useEffect(() => {
    initializeStripe()
  }, [initializeStripe])

  const loadSearchResults: LoadFunction<SearchResultModel> = useCallback(
    async (page: number, limit: number) => {
      if (!state.searchCriteria) {
        return {
          items: [],
          pagination: { page, limit, total: 0, totalPages: 0 },
        }
      }

      const response = await searchResultsUseCase.execute(
        state.searchCriteria,
        page,
        limit
      )

      return {
        items: response.items || [],
        pagination: response.pagination,
      }
    },
    [state.searchCriteria, searchResultsUseCase]
  )

  const pagination = usePagination(loadSearchResults)

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
    if (state.searchCriteria && !pagination.state.loading) {
      searchResults({ reset: true })
    }
  }, [state.searchCriteria])

  const searchResults = async ({
    reset,
  }: {
    reset: boolean
  }): Promise<void> => {
    try {
      await pagination.loadItems(reset)
    } catch (error) {
      setState((previous) => ({
        ...previous,
        error:
          error instanceof Error ? error.message : 'Error al buscar resultados',
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

  const sendReservationRequest = async (): Promise<void> => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      const reserveData = {
        startDate: DateUtils.YYYYMMDD(state.searchCriteria.fromDate),
        endDate: DateUtils.YYYYMMDD(state.searchCriteria.toDate),
        careLocation: state.searchCriteria.placeType,
        caregiverId: state.userToRequest.caregiver.id,
        petIds: state.searchCriteria.selectedPets.map((pet) => pet.id),
        visitsPerDay: state.searchCriteria.visits,
        userAddressId: state.searchCriteria.selectedAddress?._id,
        caregiverAddressId:
          state.userToRequest.caregiver.carerConfig?.careAddress,
        distance: state.searchCriteria.maxDistance,
      }
      const reservation = await createReservationUseCase.execute(reserveData, t)
      if (!reservation.id || !reservation.totalOwner) {
        throw new Error('Error al obtener los datos de la reserva')
      }

      // Parse the amount string (format: "3.557,36" -> 3557.36)
      const amountInPesos = parseSpanishNumber(reservation.totalOwner)

      await processPayment({
        amount: amountInPesos,
        currency: STRIPE_CONFIG.currency,
        reservationId: reservation.id,
      })
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error al obtener los datos de la reserva',
      }))
    }
  }

  return {
    state: {
      ...state,
      loading: state.loading || stripeLoading,
      pagination: {
        items: pagination.state.items,
        pagination: pagination.state.pagination,
        loading: pagination.state.loading,
        loadingMore: pagination.state.loadingMore,
      },
    },
    searchResults,
    setSortAndOrder,
    setUserToRequest,
    sendReservationRequest,
  }
}

export { useReservationResultsViewModel }
