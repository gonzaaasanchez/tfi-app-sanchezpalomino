import { Types } from '@app/common'

const $ = {
  ...Types,
  ReservesApi: Symbol.for('ReservationApi'),
  ReservesRepository: Symbol.for('ReservesRepository'),
  GetReservesUseCase: Symbol.for('GetReservesUseCase'),
  SearchResultsApi: Symbol.for('SearchResultsApi'),
  SearchResultsRepository: Symbol.for('SearchResultsRepository'),
  SearchResultsUseCase: Symbol.for('SearchResultsUseCase'),
}

export { $ }
