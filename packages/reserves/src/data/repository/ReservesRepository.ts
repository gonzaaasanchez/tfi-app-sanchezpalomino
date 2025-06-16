import ReservesRepository from '../../domain/repository/ReservesRepository'
import { ReservesApi } from '../datasource/api/ReservesApi'
import { ReserveStatus, ReserveType } from '../models/local/Types'
import { ReservationModel } from '../models/ReservationModel'

class ReservesRepositoryImpl implements ReservesRepository {
  private readonly api: ReservesApi

  constructor(api: ReservesApi) {
    this.api = api
  }
  async getReserves(
    type: ReserveType,
    status: ReserveStatus
  ): Promise<ReservationModel[]> {
    return this.api.getReserves(type, status)
  }

  async sendReservationRequest(): Promise<void> {
    return this.api.sendReservationRequest()
  }
}

export { ReservesRepositoryImpl }
