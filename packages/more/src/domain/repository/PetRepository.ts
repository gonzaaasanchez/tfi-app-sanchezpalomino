import { PetModel, PaginationModel, PaginatedResponse } from '@app/common'

export interface PetRepository {
  getMyPets(page?: number, limit?: number): Promise<PaginatedResponse<PetModel>>
}
