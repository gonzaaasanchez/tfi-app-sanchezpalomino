import { PetModel } from '@packages/common'
import { PlaceType } from './ReservationModel'

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortField {
  DISTANCE = 'distance',
  REVIEWS = 'reviews',
  TOTAL_PRICE = 'totalPrice',
}

export type SortOption = {
  field: SortField
  order: SortOrder
}

export type SearchCriteria = {
  fromDate: Date
  toDate: Date
  placeType: PlaceType
  reviewsFrom: number
  maxDistance: number
  maxPrice: number
  visits: number
  selectedPets: PetModel[]
  sortBy: SortOption
}
