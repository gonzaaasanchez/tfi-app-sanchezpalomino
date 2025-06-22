import { Address } from '@app/common'
import { UserRepository } from '../repository/UserRepository'

export class AddAddressUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(address: Address): Promise<Address> {
    return await this.userRepository.addAddress(address)
  }
}
