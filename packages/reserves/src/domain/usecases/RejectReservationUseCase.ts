import ReservesRepository from '../repository/ReservesRepository'
import { ReservationModel } from '../../data/models/ReservationModel'

class RejectReservationUseCase {
  private reservesRepository: ReservesRepository

  constructor(reservesRepository: ReservesRepository) {
    this.reservesRepository = reservesRepository
  }

  async execute(
    id: string,
    t: (key: string) => string,
    reason?: string
  ): Promise<ReservationModel> {
    this.validateReservationId(id, t)
    return await this.reservesRepository.rejectReservation(id, reason)
  }

  private validateReservationId(id: string, t: (key: string) => string): void {
    if (!id || id.trim() === '') {
      throw new Error(t('reserveDetailScreen.validation.reservationIdRequired'))
    }
  }
}

export { RejectReservationUseCase }
