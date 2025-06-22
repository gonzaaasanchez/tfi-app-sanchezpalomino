import {
  HttpClient,
  PetModel,
  PaginatedResponse,
  PetType,
  PetCharacteristic,
} from '@app/common'

export interface PetApi {
  getMyPets(page?: number, limit?: number): Promise<PaginatedResponse<PetModel>>
  getPetTypes(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetType>>
  getPetCharacteristics(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetCharacteristic>>
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

  async getPetTypes(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetType>> {
    const params = new URLSearchParams()
    if (page !== undefined) params.append('page', page.toString())
    if (limit !== undefined) params.append('limit', limit.toString())

    const queryString = params.toString()
    const url = `/pet-types${queryString ? `?${queryString}` : ''}`

    const response = await this.httpClient.get<PaginatedResponse<PetType>>(url)
    return response.data
  }

  async getPetCharacteristics(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetCharacteristic>> {
    const params = new URLSearchParams()
    if (page !== undefined) params.append('page', page.toString())
    if (limit !== undefined) params.append('limit', limit.toString())

    const queryString = params.toString()
    const url = `/pet-characteristics${queryString ? `?${queryString}` : ''}`

    const response =
      await this.httpClient.get<PaginatedResponse<PetCharacteristic>>(url)
    return response.data
  }
}
