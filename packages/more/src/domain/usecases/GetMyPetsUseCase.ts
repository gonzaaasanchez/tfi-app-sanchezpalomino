import { PetModel, PaginatedResponse } from '@app/common'
import { PetRepository } from '../repository/PetRepository'

export class GetMyPetsUseCase {
  constructor(private repository: PetRepository) {}

  async execute(): Promise<PaginatedResponse<PetModel>> {
    return await this.repository.getMyPets()
  }
} 