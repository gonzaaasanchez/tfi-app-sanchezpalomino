import { PetModel, PaginatedResponse } from '@app/common'
import { PetRepository } from '../../domain/repository/PetRepository'
import { PetApi } from '../datasource/api/PetApi'

export class PetRepositoryImpl implements PetRepository {
  constructor(private api: PetApi) {}

  async getMyPets(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetModel>> {
    const response = await this.api.getMyPets(page, limit)
    return response
  }
}
