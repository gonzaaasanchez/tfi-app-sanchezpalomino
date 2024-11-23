import { PetModel, UserModel } from '@packages/common'

enum PlaceType {
  Home = 'home',
  Visit = 'visit',
}

enum ReservationStatus {
  Pending = 'home',
  Confirmed = 'visit',
  Started = 'started',
  Finished = 'finished',
  CancelledOwner = 'cancelled_owner',
  CancelledCarer = 'Cancelled_Carer',
}

type ReservationModel = {
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
}

export { PlaceType, ReservationStatus, ReservationModel }
