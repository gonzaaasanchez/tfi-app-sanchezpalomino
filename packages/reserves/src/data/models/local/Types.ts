import { PlaceType } from '../ReservationModel'

type ReserveType = 'sent' | 'received'
type ReserveStatus = 'confirmed' | 'pending' | 'cancelled'

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

export { ReserveType, ReserveStatus, CreateReservationData }
