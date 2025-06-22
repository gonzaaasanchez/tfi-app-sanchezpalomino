import { HttpClient, PetModel, PaginatedResponse } from '@app/common'

export interface PetApi {
  getMyPets(): Promise<PaginatedResponse<PetModel>>
}

export class PetApiImpl implements PetApi {
  constructor(private httpClient: HttpClient) {}

  async getMyPets(): Promise<PaginatedResponse<PetModel>> {
    const response =
      await this.httpClient.get<PaginatedResponse<PetModel>>('/pets/my')
    return response.data
  }
}
