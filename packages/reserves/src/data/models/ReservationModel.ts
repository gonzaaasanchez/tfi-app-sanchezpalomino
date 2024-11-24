import { DateUtils, PetModel, UserModel } from '@packages/common'

enum PlaceType {
  Home = 'home',
  Visit = 'visit',
}

enum ReservationStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Started = 'started',
  Finished = 'finished',
  CancelledOwner = 'cancelled_owner',
  CancelledCarer = 'Cancelled_Carer',
}

class ReservationModel {
  id?: string
  userOwner?: UserModel
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
    return DateUtils.formatFromString(this.startDate)
  }

  get formattedEndDate(): string {
    return DateUtils.formatFromString(this.endDate)
  }

  get visitsRangeDate(): string {
    return `${this.formattedStartDate} - ${this.formattedEndDate}`
  }

}

export { UserModel }

export { PlaceType, ReservationStatus, ReservationModel }