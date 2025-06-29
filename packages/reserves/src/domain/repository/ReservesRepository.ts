import { CreateReservationData } from '../../data/models/local/Types'
import {
  ReservationModel,
  ReserveStatus,
  ReserveType,
} from '../../data/models/ReservationModel'
import { PaginatedResponse } from '@app/common'

interface ReservesRepository {
  getReserves(
    type: ReserveType,
    status: ReserveStatus,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<ReservationModel>>
  createReservation(data: CreateReservationData): Promise<ReservationModel>
}

export default ReservesRepository
