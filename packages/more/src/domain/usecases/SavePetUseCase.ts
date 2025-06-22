import { PetModel } from '@app/common'
import { PetRepository } from '../repository/PetRepository'

export class SavePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(pet: PetModel, avatarFile?: string | null): Promise<PetModel> {
    return await this.petRepository.savePet(pet, avatarFile)
  }
}
