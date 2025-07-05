import { CreateReservationData } from '../../data/models/local/Types'
import {
  ReservationModel,
  ReserveStatus,
  ReserveType,
} from '../../data/models/ReservationModel'
import { ReservationReviewModel } from '../../data/models/ReviewModel'
import { PaginatedResponse } from '@packages/common'

interface ReservesRepository {
  getReserves(
    type: ReserveType,
    status: ReserveStatus,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<ReservationModel>>
  createReservation(data: CreateReservationData): Promise<ReservationModel>
  acceptReservation(id: string): Promise<ReservationModel>
  rejectReservation(id: string, reason?: string): Promise<ReservationModel>
  cancelReservation(id: string, reason?: string): Promise<ReservationModel>
  getReservationReviews(id: string): Promise<ReservationReviewModel>
}

export default ReservesRepository
