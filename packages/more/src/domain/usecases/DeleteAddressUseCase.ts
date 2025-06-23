import { UserRepository } from '../repository/UserRepository'

export class DeleteAddressUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(addressId: string): Promise<void> {
    return await this.userRepository.deleteAddress(addressId)
  }
} 