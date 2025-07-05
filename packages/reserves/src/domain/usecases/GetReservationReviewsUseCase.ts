import { ReservationReviewModel } from '../../data/models/ReviewModel'
import ReservesRepository from '../repository/ReservesRepository'

class GetReservationReviewsUseCase {
  private reservesRepository: ReservesRepository

  constructor(reservesRepository: ReservesRepository) {
    this.reservesRepository = reservesRepository
  }

  async execute(reservationId: string): Promise<ReservationReviewModel> {
    return await this.reservesRepository.getReservationReviews(reservationId)
  }
}

export { GetReservationReviewsUseCase }
