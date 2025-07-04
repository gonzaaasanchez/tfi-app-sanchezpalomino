import ReservesRepository from '../../domain/repository/ReservesRepository'
import { ReservesApi } from '../datasource/api/ReservesApi'
import { CreateReservationData } from '../models/local/Types'
import {
  ReservationModel,
  ReserveStatus,
  ReserveType,
} from '../models/ReservationModel'
import { PaginatedResponse } from '@packages/common'

class ReservesRepositoryImpl implements ReservesRepository {
  private readonly api: ReservesApi

  constructor(api: ReservesApi) {
    this.api = api
  }

  async getReserves(
    type: ReserveType,
    status: ReserveStatus,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<ReservationModel>> {
    return this.api.getReserves(type, status, page, limit)
  }

  async createReservation(
    data: CreateReservationData
  ): Promise<ReservationModel> {
    return this.api.createReservation(data)
  }

  async acceptReservation(id: string): Promise<ReservationModel> {
    return this.api.acceptReservation(id)
  }

  async rejectReservation(
    id: string,
    reason?: string
  ): Promise<ReservationModel> {
    return this.api.rejectReservation(id, reason)
  }

  async cancelReservation(
    id: string,
    reason?: string
  ): Promise<ReservationModel> {
    return this.api.cancelReservation(id, reason)
  }
}

export { ReservesRepositoryImpl }
