import { HttpClient } from '@app/common'
import { ReservationModel } from '../../models/ReservationModel'
import {
  GetReceivedReservatiosMockedResponse,
  GetSentReservatiosMockedResponse,
} from '../../models/local/GetReservatiosMockedResponse'
import { ReserveStatus, ReserveType } from '../../models/local/Types'

interface ReservesApi {
  getReserves(
    type: ReserveType,
    status: ReserveStatus
  ): Promise<ReservationModel[]>
  sendReservationRequest(): Promise<void>
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
    if (type === 'sent') {
      return status === 'confirmed'
        ? GetSentReservatiosMockedResponse.pending
        : []
    }
    switch (status) {
      case 'cancelled':
        return GetReceivedReservatiosMockedResponse.cancelled
      case 'confirmed':
        return GetReceivedReservatiosMockedResponse.confirmed
      case 'pending':
        return GetReceivedReservatiosMockedResponse.pending
    }
  }

  async sendReservationRequest(): Promise<void> {
    // TODO: Implement real API call
    // await this.httpClient.post('/reserves/request', {})
    await this.delay(3000)
    return Promise.resolve()
  }
}

export { ReservesApi, ReservesApiImpl }
