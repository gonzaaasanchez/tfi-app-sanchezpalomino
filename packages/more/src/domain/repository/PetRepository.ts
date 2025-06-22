import {
  PetModel,
  PaginatedResponse,
  PetType,
  PetCharacteristic,
} from '@app/common'

export interface PetRepository {
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
