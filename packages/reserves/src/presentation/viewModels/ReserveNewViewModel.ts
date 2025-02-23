import { UIState } from '@packages/common'
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
  createReserve: () => Promise<void>
}

type ReserveNewState = {
  fromDate: Date
  toDate: Date
  placeType: PlaceType
  reviewsFrom: number
  maxDistance: number
  maxPrice: number
} & UIState

const initialState: ReserveNewState = {
  loading: false,
  error: null,
  fromDate: null,
  placeType: PlaceType.Home,
  reviewsFrom: 1,
  maxDistance: 10,
  maxPrice: 100000,
  toDate: null,
}

const useReserveNewViewModel = (): ReserveNewViewModel => {
  const [state, setState] = useState<ReserveNewState>(initialState)

  const createReserve = async (): Promise<void> => {
    console.log('createReserve')
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

  return {
    state,
    setStartDate,
    setEndDate,
    setPlaceType,
    setReviewsFrom,
    setMaxDistance,
    setMaxPrice,
    createReserve,
  }
}

export { useReserveNewViewModel }
