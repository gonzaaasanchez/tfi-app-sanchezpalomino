import { PetCharacteristic, PaginatedResponse } from '@app/common'
import { PetRepository } from '../repository/PetRepository'

export class GetPetCharacteristicsUseCase {
  constructor(private repository: PetRepository) {}

  async execute(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetCharacteristic>> {
    return await this.repository.getPetCharacteristics(page, limit)
  }
}
