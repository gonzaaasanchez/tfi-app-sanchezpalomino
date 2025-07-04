import { HttpClient, PaginatedResponse } from '@packages/common'
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
  acceptReservation(id: string): Promise<ReservationModel>
  rejectReservation(id: string, reason?: string): Promise<ReservationModel>
  cancelReservation(id: string, reason?: string): Promise<ReservationModel>
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

  async acceptReservation(id: string): Promise<ReservationModel> {
    const response = await this.httpClient.put<ReservationModel>(
      `/reservations/${id}/accept`
    )
    return response.data
  }

  async rejectReservation(
    id: string,
    reason?: string
  ): Promise<ReservationModel> {
    const requestBody = reason ? { reason } : {}
    const response = await this.httpClient.put<ReservationModel>(
      `/reservations/${id}/reject`,
      requestBody
    )
    return response.data
  }

  async cancelReservation(
    id: string,
    reason?: string
  ): Promise<ReservationModel> {
    const requestBody = reason ? { reason } : {}
    const response = await this.httpClient.put<ReservationModel>(
      `/reservations/${id}/cancel`,
      requestBody
    )
    return response.data
  }
}

export { ReservesApi, ReservesApiImpl }
