import {
  ReservationModel,
  ReserveStatus,
  ReserveType,
} from '../../data/models/ReservationModel'
import ReservesRepository from '../repository/ReservesRepository'
import { PaginatedResponse } from '@packages/common'

class GetReservesUseCase {
  private reservesRepository: ReservesRepository

  constructor(reservesRepository: ReservesRepository) {
    this.reservesRepository = reservesRepository
  }

  async execute(
    type: ReserveType,
    status: ReserveStatus,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<ReservationModel>> {
    return await this.reservesRepository.getReserves(type, status, page, limit)
  }
}

export { GetReservesUseCase }
