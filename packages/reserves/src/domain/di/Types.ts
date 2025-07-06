import { Types } from '@app/common'

const $ = {
  ...Types,
  ReservesApi: Symbol.for('ReservationApi'),
  ReservesRepository: Symbol.for('ReservesRepository'),
  GetReservesUseCase: Symbol.for('GetReservesUseCase'),
  SearchResultsApi: Symbol.for('SearchResultsApi'),
  SearchResultsRepository: Symbol.for('SearchResultsRepository'),
  SearchResultsUseCase: Symbol.for('SearchResultsUseCase'),
  CreateReservationUseCase: Symbol.for('CreateReservationUseCase'),
  AcceptReservationUseCase: Symbol.for('AcceptReservationUseCase'),
  RejectReservationUseCase: Symbol.for('RejectReservationUseCase'),
  CancelReservationUseCase: Symbol.for('CancelReservationUseCase'),
  GetReservationReviewsUseCase: Symbol.for('GetReservationReviewsUseCase'),
  SaveReviewUseCase: Symbol.for('SaveReviewUseCase'),
}

export { $ }
