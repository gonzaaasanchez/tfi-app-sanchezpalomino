import ReservesRepository from '../repository/ReservesRepository'
import { ReviewModel } from '../../data/models/ReviewModel'

class SaveReviewUseCase {
  private reservesRepository: ReservesRepository

  constructor(reservesRepository: ReservesRepository) {
    this.reservesRepository = reservesRepository
  }

  async execute(
    reservationId: string,
    rating: number,
    comment: string
  ): Promise<ReviewModel> {
    return await this.reservesRepository.saveReview(
      reservationId,
      rating,
      comment
    )
  }
}

export { SaveReviewUseCase }
