import { PetType, PaginatedResponse } from '@app/common'
import { PetRepository } from '../repository/PetRepository'

export class GetPetTypesUseCase {
  constructor(private repository: PetRepository) {}

  async execute(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetType>> {
    return await this.repository.getPetTypes(page, limit)
  }
}
