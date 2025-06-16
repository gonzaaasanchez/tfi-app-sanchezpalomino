import { UIState, useInjection } from '@packages/common'
import { useState } from 'react'
import { SearchResultsUseCase } from '../../domain/usecases/SearchResultsUseCase'
import { $ } from '../../domain/di/Types'
import { SearchResultModel } from '../../data/models/SearchResultModel'
import { useRoute, RouteProp } from '@react-navigation/native'
import { SearchCriteria } from '../../data/models/SearchCriteria'

type ReservationResultsScreenProps = {
  reservationResults: {
    searchCriteria: SearchCriteria
  }
}

type ReservationResultsViewModel = {
  state: ReservationResultsState
  searchResults: () => Promise<void>
}

type ReservationResultsState = {
  results: SearchResultModel[]
} & UIState

const initialState: ReservationResultsState = {
  loading: false,
  error: null,
  results: [],
}

const useReservationResultsViewModel = (): ReservationResultsViewModel => {
  const [state, setState] = useState<ReservationResultsState>(initialState)
  const searchResultsUseCase: SearchResultsUseCase = useInjection(
    $.SearchResultsUseCase
  )
  const route = useRoute<RouteProp<ReservationResultsScreenProps, 'reservationResults'>>()
  const { searchCriteria } = route.params

  const searchResults = async (): Promise<void> => {
    if (!searchCriteria) {
      setState((previous) => ({
        ...previous,
        loading: false,
      }))
      return
    }

    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      const results = await searchResultsUseCase.execute(searchCriteria)

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

  return { state, searchResults }
}

export { useReservationResultsViewModel }
