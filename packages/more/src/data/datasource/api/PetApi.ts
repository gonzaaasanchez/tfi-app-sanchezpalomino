import {
  HttpClient,
  PetModel,
  PaginatedResponse,
  PetType,
  PetCharacteristic,
  buildPaginatedUrl,
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
  savePet(pet: PetModel, avatarFile?: string | null): Promise<PetModel>
}

export class PetApiImpl implements PetApi {
  constructor(private httpClient: HttpClient) {}

  async getMyPets(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetModel>> {
    const url = buildPaginatedUrl('/pets/my', { page, limit })
    const response = await this.httpClient.get<PaginatedResponse<PetModel>>(url)
    return response.data
  }

  async getPetTypes(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetType>> {
    const url = buildPaginatedUrl('/pet-types', { page, limit })
    const response = await this.httpClient.get<PaginatedResponse<PetType>>(url)
    return response.data
  }

  async getPetCharacteristics(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetCharacteristic>> {
    const url = buildPaginatedUrl('/pet-characteristics', { page, limit })
    const response =
      await this.httpClient.get<PaginatedResponse<PetCharacteristic>>(url)
    return response.data
  }

  async savePet(pet: PetModel, avatarFile?: string | null): Promise<PetModel> {
    return Promise.resolve({} as PetModel)
  }
}
