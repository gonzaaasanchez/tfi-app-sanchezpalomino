import { PetModel } from '@packages/common'
import { PlaceType } from './ReservationModel'

export type SearchCriteria = {
  fromDate: Date
  toDate: Date
  placeType: PlaceType
  reviewsFrom: number
  maxDistance: number
  maxPrice: number
  visits: number
  selectedPets: PetModel[]
} 