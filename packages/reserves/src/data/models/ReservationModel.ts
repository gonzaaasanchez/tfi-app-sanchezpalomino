import { DateUtils, PetModel, UserModel } from '@packages/common'

enum PlaceType {
  OwnerHome = 'OwnerHome',
  CarerHome = 'CarerHome',
}

enum ReservationStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Started = 'started',
  Finished = 'finished',
  CancelledOwner = 'cancelled_owner',
  CancelledCarer = 'cancelled_carer',
}

class ReservationModel {
  id?: string
  userOwner?: UserModel
  userCarer?: UserModel
  placeType: PlaceType
  visitsPerDay: number
  pets?: PetModel[]
  startDate: string
  endDate: string
  location?: string
  status: ReservationStatus
  distance?: number

  constructor(data: Partial<ReservationModel>) {
    this.id = data.id
    this.userOwner = data.userOwner
    this.userCarer = data.userCarer
    this.placeType = data.placeType
    this.visitsPerDay = data.visitsPerDay
    this.pets = data.pets
    this.startDate = data.startDate
    this.endDate = data.endDate
    this.location = data.location
    this.status = data.status
    this.distance = data.distance
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
  / The following methods decides whether to show userOwner | userCarer info in reservation detail screens
  */

  get createdByUser(): boolean {
    const createdByUser = this.userOwner?.id === 'u100'
    return createdByUser
  }

  get createdForUser(): boolean {
    const createdForUser = this.userCarer?.id === 'u100'
    return createdForUser
  }

  get placeDetailText(): string {
    const isCarerHome = this.placeType === PlaceType.OwnerHome
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
    return this.createdByUser ? this.userCarer?.avatar : this.userOwner?.avatar
  }

  get placeDetailUsername(): string {
    return this.createdByUser
      ? this.userCarer?.fullName
      : this.userOwner?.fullName
  }

  get placeDetailPhoneNumber(): string {
    return this.createdByUser
      ? this.userCarer?.phoneNumber
      : this.userOwner?.phoneNumber
  }
}

export { UserModel, PlaceType, ReservationStatus, ReservationModel }
