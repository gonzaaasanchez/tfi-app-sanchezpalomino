import { UIState, PetModel } from '@packages/common'
import { useState } from 'react'
import { PlaceType } from '../../data/models/ReservationModel'
import { StackActions, useNavigation } from '@react-navigation/native'
import { SearchCriteria } from '../../data/models/SearchCriteria'

type ReserveNewViewModel = {
  state: ReserveNewState
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
  setPlaceType: (placeType: PlaceType) => void
  setReviewsFrom: (reviewsFrom: number) => void
  setMaxDistance: (maxDistance: number) => void
  setMaxPrice: (maxPrice: number) => void
  setVisitsPerDay: (visits: number) => void
  setSelectedPets: (pets: PetModel[]) => void
  searchResults: () => Promise<void>
}

type ReserveNewState = {
  searchCriteria: SearchCriteria
} & UIState

const initialSearchCriteria: SearchCriteria = {
  fromDate: new Date(),
  toDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  placeType: PlaceType.Home,
  reviewsFrom: 1,
  maxDistance: 5,
  maxPrice: 50000,
  visits: 1,
  selectedPets: [],
}

const initialState: ReserveNewState = {
  loading: false,
  error: null,
  searchCriteria: initialSearchCriteria,
}

const useReserveNewViewModel = (): ReserveNewViewModel => {
  const [state, setState] = useState<ReserveNewState>(initialState)
  const navigation = useNavigation()

  const validateData: () => [boolean, string?] = () => {
    const { searchCriteria } = state
    if (searchCriteria.fromDate > searchCriteria.toDate) {
      return [false, 'La fecha de inicio debe ser anterior a la fecha de fin']
    }
    if (searchCriteria.reviewsFrom < 1) {
      return [false, 'El número de reseñas debe ser mayor a 0']
    }
    if (searchCriteria.maxDistance <= 0) {
      return [false, 'La distancia máxima debe ser mayor a 0']
    }
    if (searchCriteria.maxPrice <= 0) {
      return [false, 'El precio máximo debe ser mayor a 0']
    }
    if (searchCriteria.visits < 1) {
      return [false, 'El número de visitas por día debe ser mayor a 0']
    }
    if (searchCriteria.selectedPets.length === 0) {
      return [false, 'Debes seleccionar al menos una mascota']
    }
    return [true]
  }

  const searchResults = async (): Promise<void> => {
    const [isValid, error] = validateData()
    if (!isValid) {
      setState((previous: ReserveNewState) => ({
        ...previous,
        error: error,
      }))
      return
    }

    navigation.dispatch(
      StackActions.push('reservationResults', {
        searchCriteria: state.searchCriteria
      })
    )
  }

  const setStartDate = (date: Date) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, fromDate: date },
    }))
  }

  const setEndDate = (date: Date) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, toDate: date },
    }))
  }

  const setPlaceType = (placeType: PlaceType) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, placeType },
    }))
  }

  const setReviewsFrom = (reviewsFrom: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, reviewsFrom },
    }))
  }

  const setMaxDistance = (maxDistance: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, maxDistance },
    }))
  }

  const setMaxPrice = (maxPrice: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, maxPrice },
    }))
  }

  const setVisitsPerDay = (visits: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, visits },
    }))
  }

  const setSelectedPets = (pets: PetModel[]) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, selectedPets: pets },
    }))
  }

  return {
    state,
    setStartDate,
    setEndDate,
    setPlaceType,
    setReviewsFrom,
    setMaxDistance,
    setMaxPrice,
    setVisitsPerDay,
    setSelectedPets,
    searchResults,
  }
}

export { useReserveNewViewModel }
