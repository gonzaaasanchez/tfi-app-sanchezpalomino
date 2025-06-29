import { PlaceType } from '../ReservationModel'

interface CreateReservationData {
  startDate: string
  endDate: string
  careLocation: PlaceType
  caregiverId: string
  petIds: string[]
  visitsPerDay?: number
  userAddressId?: string
  caregiverAddressId?: string
  distance: number
}

export { CreateReservationData }
