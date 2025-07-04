import { AddressModel } from './AddressModel'
import { PetType } from './PetModel'

export interface CarerConfig {
  homeCare: {
    enabled: boolean
    dayPrice: number | null
  }
  petHomeCare: {
    enabled: boolean
    visitPrice: number | null
  }
  petTypes?: PetType[]
  careAddressData?: AddressModel
  careAddress?: string
}

export interface UserReviews {
  averageRatingAsUser: number
  totalReviewsAsUser: number
  averageRatingAsCaregiver: number
  totalReviewsAsCaregiver: number
}

class UserModel {
  id?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  email?: string
  avatar?: string
  carerConfig?: CarerConfig
  addresses?: AddressModel[]
  reviews?: UserReviews

  constructor(data: Partial<UserModel>) {
    this.id = data.id || null
    this.firstName = data.firstName || null
    this.lastName = data.lastName || null
    this.phoneNumber = data.phoneNumber || null
    this.email = data.email || null
    this.avatar = data.avatar || null
    this.carerConfig = data.carerConfig || null
    this.addresses = data.addresses || []
    this.reviews = data.reviews || null
  }

  get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim()
  }

  toPlainObject() {
    return Object.assign({}, this)
  }
}

export { UserModel }
