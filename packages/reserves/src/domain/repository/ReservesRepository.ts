import {
  ReserveType,
  ReserveStatus,
  CreateReservationData,
} from '../../data/models/local/Types'
import { ReservationModel } from '../../data/models/ReservationModel'

interface ReservesRepository {
  getReserves(
    type: ReserveType,
    status: ReserveStatus
  ): Promise<ReservationModel[]>
  createReservation(data: CreateReservationData): Promise<ReservationModel>
}

export default ReservesRepository
