import { Types } from '@app/common'

const $ = {
  ...Types,
  ReservesApi: Symbol.for('ReservationApi'),
  ReservesRepository: Symbol.for('ReservesRepository'),
  GetReservesUseCase: Symbol.for('GetReservesUseCase'),
}

export { $ }
