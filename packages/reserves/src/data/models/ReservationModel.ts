import { AddressModel, DateUtils, PetModel, UserModel } from '@packages/common'

enum PlaceType {
  OwnerHome = 'pet_home',
  CarerHome = 'caregiver_home',
}

enum ReserveType {
  Owner = 'owner',
  Caregiver = 'caregiver',
}

enum ReserveStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Started = 'started',
  Finished = 'finished',
  CancelledOwner = 'cancelled_owner',
  CancelledCarer = 'cancelled_carer',
}

class ReservationModel {
  id?: string
  user?: UserModel
  caregiver?: UserModel
  careLocation: PlaceType
  address?: AddressModel
  visitsCount: number
  pets?: PetModel[]
  startDate: string
  endDate: string
  totalPrice?: string
  commission?: string
  totalOwner?: string
  totalCaregiver?: string
  distance?: number
  status: ReserveStatus
  createdAt?: string
  updatedAt?: string

  constructor(data: Partial<ReservationModel> | any) {
    this.id = data.id
    this.user = data.user ? new UserModel(data.user) : undefined
    this.caregiver = data.caregiver ? new UserModel(data.caregiver) : undefined
    this.careLocation = data.careLocation
    this.address = data.address ? new AddressModel(data.address) : undefined
    this.visitsCount = data.visitsCount
    this.pets = data.pets
    this.startDate = data.startDate
    this.endDate = data.endDate
    this.totalPrice = data.totalPrice
    this.commission = data.commission
    this.totalOwner = data.totalOwner
    this.totalCaregiver = data.totalCaregiver
    this.distance = data.distance
    this.status = data.status
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

  get formattedStartDate(): string {
    return DateUtils.MMDDYYYY(this.startDate)
  }

  get formattedEndDate(): string {
    return DateUtils.MMDDYYYY(this.endDate)
  }

  get visitsRangeDate(): string {
    return `${this.formattedStartDate} - ${this.formattedEndDate}`
  }

  /*
  / The following methods decides whether to show user | caregiver info in reservation detail screens
  */

  get createdByUser(): boolean {
    const createdByUser = this.user?.id === '6855f7a879c07ee2898525f7'
    return createdByUser
  }

  get createdForUser(): boolean {
    const createdForUser = this.caregiver?.id === '685b709c823da31e445fde56'
    return createdForUser
  }

  get placeDetailText(): string {
    const isCarerHome = this.careLocation === PlaceType.OwnerHome
    const isSinglePet = this.pets?.length === 1

    const getTranslationKey = (
      createdByUser: boolean,
      isCarerHome: boolean,
      isSinglePet: boolean
    ) => {
      if (createdByUser) {
        if (isCarerHome) {
          return isSinglePet
            ? 'reserveDetailScreen.placeTypeCarerHome'
            : 'reserveDetailScreen.placeTypeCarerHomePlural'
        }
        return isSinglePet
          ? 'reserveDetailScreen.placeTypeCarerVisit'
          : 'reserveDetailScreen.placeTypeCarerVisitPlural'
      }

      if (isCarerHome) {
        return isSinglePet
          ? 'reserveDetailScreen.placeTypeOwnerHome'
          : 'reserveDetailScreen.placeTypeOwnerHomePlural'
      }
      return isSinglePet
        ? 'reserveDetailScreen.placeTypeOwnerVisit'
        : 'reserveDetailScreen.placeTypeOwnerVisitPlural'
    }

    return getTranslationKey(this.createdByUser, isCarerHome, isSinglePet)
  }

  get placeDetailAvatar(): string {
    return this.createdByUser ? this.caregiver?.avatar : this.user?.avatar
  }

  get placeDetailUsername(): string {
    return this.createdByUser ? this.caregiver?.fullName : this.user?.fullName
  }

  get placeDetailPhoneNumber(): string {
    return this.createdByUser
      ? this.caregiver?.phoneNumber
      : this.user?.phoneNumber
  }
}

export { UserModel, PlaceType, ReserveStatus, ReserveType, ReservationModel }
