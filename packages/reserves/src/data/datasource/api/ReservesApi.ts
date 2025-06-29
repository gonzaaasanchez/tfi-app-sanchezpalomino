import { HttpClient, PaginatedResponse } from '@app/common'
import {
  ReservationModel,
  ReserveStatus,
  ReserveType,
} from '../../models/ReservationModel'
import { CreateReservationData } from '../../models/local/Types'

interface ReservesApi {
  getReserves(
    type: ReserveType,
    status: ReserveStatus,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<ReservationModel>>
  createReservation(data: CreateReservationData): Promise<ReservationModel>
}

class ReservesApiImpl implements ReservesApi {
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async getReserves(
    type: ReserveType,
    status: ReserveStatus,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<ReservationModel>> {
    const queryParams = new URLSearchParams({
      role: type,
      status,
      page: page.toString(),
      limit: limit.toString(),
    })

    const response = await this.httpClient.get<
      PaginatedResponse<ReservationModel>
    >(`/reservations?${queryParams.toString()}`)

    const rawData = response.data
    return {
      items: rawData.items.map((item) => new ReservationModel(item)),
      pagination: rawData.pagination,
    }
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
