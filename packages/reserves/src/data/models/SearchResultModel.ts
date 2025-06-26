import { UserModel } from '@packages/common'

export interface CareDetailsModel {
  daysCount: number
  visitsCount: number
  pricePerVisit: number
}

export interface SearchResultModel {
  caregiver: UserModel
  totalPrice: number
  commission: number
  totalWithCommission: number
  careDetails: CareDetailsModel
} 