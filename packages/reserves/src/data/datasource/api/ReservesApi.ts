import { HttpClient, UserModel } from '@app/common'
import { ReservationModel } from '../../models/ReservationModel'
import { GetReservatiosMockedResponse } from '../../models/local/GetReservatiosMockedResponse'
import { ReserveStatus, ReserveType } from '../../models/local/Types'

interface ReservesApi {
  getReserves(
    type: ReserveType,
    status: ReserveStatus
  ): Promise<ReservationModel[]>
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
    // const response = await this.httpClient.get<ReservationModel[]>('/reserves')
    // return response
    await this.delay(2000)
    if (type === 'received') {
      return []
    }
    switch (status) {
      case 'cancelled':
        return GetReservatiosMockedResponse.cancelled
      case 'confirmed':
        return GetReservatiosMockedResponse.confirmed
      case 'pending':
        return GetReservatiosMockedResponse.pending
    }
  }
}

export { ReservesApi, ReservesApiImpl }
