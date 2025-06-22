import { Address } from '@app/common'
import { UserRepository } from '../repository/UserRepository'

export class GetAddressesUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<Address[]> {
    return await this.userRepository.getAddresses()
  }
} 