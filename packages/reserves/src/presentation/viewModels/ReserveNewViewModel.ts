import { UIState, PetModel } from '@packages/common'
import { useState } from 'react'
import { PlaceType } from '../../data/models/ReservationModel'

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
  createReserve: () => Promise<void>
}

type ReserveNewState = {
  fromDate: Date
  toDate: Date
  placeType: PlaceType
  reviewsFrom: number
  maxDistance: number
  maxPrice: number
  visits: number
  selectedPets: PetModel[]
} & UIState

const initialState: ReserveNewState = {
  loading: false,
  error: null,
  fromDate: null,
  placeType: PlaceType.Home,
  reviewsFrom: 1,
  maxDistance: 10,
  maxPrice: 100000,
  visits: 1,
  toDate: null,
  selectedPets: [],
}

const useReserveNewViewModel = (): ReserveNewViewModel => {
  const [state, setState] = useState<ReserveNewState>(initialState)

  const validateData: () => [boolean, string?] = () => {
    if (!state.fromDate) {
      return [false, 'La fecha de inicio es requerida']
    }
    if (!state.toDate) {
      return [false, 'La fecha de fin es requerida']
    }
    if (state.fromDate > state.toDate) {
      return [false, 'La fecha de inicio debe ser anterior a la fecha de fin']
    }
    if (state.reviewsFrom < 1) {
      return [false, 'El número de reseñas debe ser mayor a 0']
    }
    if (state.maxDistance <= 0) {
      return [false, 'La distancia máxima debe ser mayor a 0']
    }
    if (state.maxPrice <= 0) {
      return [false, 'El precio máximo debe ser mayor a 0']
    }
    if (state.visits < 1) {
      return [false, 'El número de visitas por día debe ser mayor a 0']
    }
    if (state.selectedPets.length === 0) {
      return [false, 'Debes seleccionar al menos una mascota']
    }
    return [true]
  }

  const createReserve = async (): Promise<void> => {
    const [isValid, error] = validateData()
    if (!isValid) {
      setState((previous: ReserveNewState) => ({
        ...previous,
        error: error,
      }))
      return
    }
    setState((previous: ReserveNewState) => ({
      ...previous,
      loading: true,
    }))
  }

  const setStartDate = (date: Date) => {
    setState((previous: ReserveNewState) => ({ ...previous, fromDate: date }))
  }

  const setEndDate = (date: Date) => {
    setState((previous: ReserveNewState) => ({ ...previous, toDate: date }))
  }

  const setPlaceType = (placeType: PlaceType) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      placeType: placeType,
    }))
  }

  const setReviewsFrom = (reviewsFrom: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      reviewsFrom: reviewsFrom,
    }))
  }

  const setMaxDistance = (maxDistance: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      maxDistance: maxDistance,
    }))
  }

  const setMaxPrice = (maxPrice: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      maxPrice: maxPrice,
    }))
  }

  const setVisitsPerDay = (visits: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      visits: visits,
    }))
  }

  const setSelectedPets = (pets: PetModel[]) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      selectedPets: pets,
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
    createReserve,
  }
}

export { useReserveNewViewModel }
