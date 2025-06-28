import { HttpClient } from '@app/common'
import { ReservationModel } from '../../models/ReservationModel'
import {
  ReserveStatus,
  ReserveType,
  CreateReservationData,
} from '../../models/local/Types'

interface ReservesApi {
  getReserves(
    type: ReserveType,
    status: ReserveStatus
  ): Promise<ReservationModel[]>
  createReservation(data: CreateReservationData): Promise<ReservationModel>
}

class ReservesApiImpl implements ReservesApi {
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getReserves(
    type: ReserveType,
    status: ReserveStatus
  ): Promise<ReservationModel[]> {
    // const response = await this.httpClient.get<ReservationModel[]>('/reservations')
    // return response
    await this.delay(1000)
    return []
  }

  async createReservation(
    data: CreateReservationData
  ): Promise<ReservationModel> {
    const requestBody: any = {
      startDate: data.startDate,
      endDate: data.endDate,
      careLocation: data.careLocation,
      caregiverId: data.caregiverId,
      petIds: data.petIds,
      distance: data.distance,
      visitsPerDay: data.visitsPerDay,
      userAddressId: data.userAddressId,
      caregiverAddressId: data.caregiverAddressId,
    }
    const response = await this.httpClient.post<ReservationModel>(
      '/reservations',
      requestBody
    )

    return response.data
  }
}

export { ReservesApi, ReservesApiImpl }
