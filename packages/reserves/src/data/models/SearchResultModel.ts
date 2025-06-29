import { UserModel } from '@packages/common'

export interface CareDetailsModel {
  daysCount: number
  visitsCount: number
  pricePerVisit: number
}

export interface SearchResultModel {
  caregiver: UserModel
  distance: number
  daysCount: number
  totalPrice: number
  commission: number
  totalOwner: number
  careDetails: CareDetailsModel
} 