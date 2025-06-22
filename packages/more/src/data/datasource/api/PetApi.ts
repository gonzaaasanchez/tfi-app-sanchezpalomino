import { HttpClient, PetModel, PaginatedResponse } from '@app/common'

export interface PetApi {
  getMyPets(page?: number, limit?: number): Promise<PaginatedResponse<PetModel>>
}

export class PetApiImpl implements PetApi {
  constructor(private httpClient: HttpClient) {}

  async getMyPets(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetModel>> {
    const params = new URLSearchParams()
    if (page !== undefined) params.append('page', page.toString())
    if (limit !== undefined) params.append('limit', limit.toString())

    const queryString = params.toString()
    const url = `/pets/my${queryString ? `?${queryString}` : ''}`

    const response = await this.httpClient.get<PaginatedResponse<PetModel>>(url)
    return response.data
  }
}
