import { AddressModel, DateUtils, PetModel, UserModel } from '@packages/common'
import { Options } from 'react-native/Libraries/Utilities/codegenNativeComponent'

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
  Rejected = 'rejected',
  Started = 'started',
  Finished = 'finished',
  CancelledOwner = 'cancelled_owner',
  CancelledCarer = 'cancelled_carer',
}

export const ReserveLabelFromStatus = (status: ReserveStatus) => {
  switch (status) {
    case ReserveStatus.Pending:
      return 'reservesScreen.statuses.pending'
    case ReserveStatus.Confirmed:
      return 'reservesScreen.statuses.accepted'
    case ReserveStatus.Started:
      return 'reservesScreen.statuses.inProgress'
    case ReserveStatus.Finished:
      return 'reservesScreen.statuses.finished'
    case ReserveStatus.CancelledOwner:
      return 'reservesScreen.statuses.cancelled'
    case ReserveStatus.CancelledCarer:
      return 'reservesScreen.statuses.cancelled'
    case ReserveStatus.Rejected:
      return 'reservesScreen.statuses.rejected'
  }
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
    return DateUtils.DDMMYYYY(this.startDate)
  }

  get formattedEndDate(): string {
    return DateUtils.DDMMYYYY(this.endDate)
  }

  get visitsRangeDate(): string {
    return `${this.formattedStartDate} - ${this.formattedEndDate}`
  }

  /*
  / The following methods decides whether to show user | caregiver info in reservation detail screens
  */

  placeDetailText({
    isUserRequest,
    t,
  }: {
    isUserRequest: boolean
    t: (key: string, options?: Options) => string
  }): string {
    const isSinglePet = this.pets?.length === 1
    const isOwnerHome = this.careLocation === PlaceType.OwnerHome

    if (isUserRequest) {
      if (isOwnerHome) {
        return isSinglePet
          ? t('reservesScreen.placeDetail.userRequest.ownerHome.singlePet')
          : t('reservesScreen.placeDetail.userRequest.ownerHome.multiplePets')
      }
      return isSinglePet
        ? t('reservesScreen.placeDetail.userRequest.carerHome.singlePet')
        : t('reservesScreen.placeDetail.userRequest.carerHome.multiplePets')
    }
    if (isOwnerHome) {
      return isSinglePet
        ? t('reservesScreen.placeDetail.carerRequest.ownerHome.singlePet')
        : t('reservesScreen.placeDetail.carerRequest.ownerHome.multiplePets')
    }
    return isSinglePet
      ? t('reservesScreen.placeDetail.carerRequest.carerHome.singlePet')
      : t('reservesScreen.placeDetail.carerRequest.carerHome.multiplePets')
  }

  placeDetailAvatar({ isUserRequest }: { isUserRequest: boolean }): string {
    return isUserRequest ? this.caregiver?.avatar : this.user?.avatar
  }

  placeDetailUsername({ isUserRequest }: { isUserRequest: boolean }): string {
    return isUserRequest ? this.caregiver?.fullName : this.user?.fullName
  }

  placeDetailPhone({ isUserRequest }: { isUserRequest: boolean }): string {
    return isUserRequest ? this.caregiver?.phoneNumber : this.user?.phoneNumber
  }

  placeDetailReviews({
    isUserRequest,
  }: {
    isUserRequest: boolean
  }): { average: string; total: string } | undefined {
    const targetUser = isUserRequest ? this.caregiver : this.user
    return targetUser?.reviews
      ? {
          average: isUserRequest
            ? targetUser.reviews.averageRatingAsCaregiver.toString()
            : targetUser.reviews.averageRatingAsUser.toString(),
          total: isUserRequest
            ? targetUser.reviews.totalReviewsAsCaregiver.toString()
            : targetUser.reviews.totalReviewsAsUser.toString(),
        }
      : undefined
  }
}

export { UserModel, PlaceType, ReserveStatus, ReserveType, ReservationModel }
