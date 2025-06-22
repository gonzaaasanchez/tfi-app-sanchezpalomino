import { PetRepository } from '../repository/PetRepository'

export class DeletePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(petId: string): Promise<void> {
    return await this.petRepository.deletePet(petId)
  }
}
