import {
  PetModel,
  PaginatedResponse,
  PetType,
  PetCharacteristic,
} from '@app/common'
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

  async getPetTypes(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetType>> {
    const response = await this.api.getPetTypes(page, limit)
    return response
  }

  async getPetCharacteristics(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetCharacteristic>> {
    const response = await this.api.getPetCharacteristics(page, limit)
    return response
  }
}
