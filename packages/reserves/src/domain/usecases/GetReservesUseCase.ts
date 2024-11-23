import { ReserveType, ReserveStatus } from '../../data/models/local/Types'
import { ReservationModel } from '../../data/models/ReservationModel'
import ReservesRepository from '../repository/ReservesRepository'

class GetReservesUseCase {
  private reservesRepository: ReservesRepository

  constructor(reservesRepository: ReservesRepository) {
    this.reservesRepository = reservesRepository
  }
  async execute(
    type: ReserveType,
    status: ReserveStatus
  ): Promise<ReservationModel[]> {
    return await this.reservesRepository.getReserves(type, status)
  }
}

export { GetReservesUseCase }
