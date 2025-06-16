import ReservesRepository from '../repository/ReservesRepository'

class SendReservationRequestUseCase {
  private reservesRepository: ReservesRepository

  constructor(reservesRepository: ReservesRepository) {
    this.reservesRepository = reservesRepository
  }

  async execute(): Promise<void> {
    return await this.reservesRepository.sendReservationRequest()
  }
}

export { SendReservationRequestUseCase }
