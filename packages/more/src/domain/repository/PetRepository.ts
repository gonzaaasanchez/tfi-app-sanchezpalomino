import { PetModel, PaginationModel, PaginatedResponse } from '@app/common'

export interface PetRepository {
  getMyPets(): Promise<PaginatedResponse<PetModel>>
} 