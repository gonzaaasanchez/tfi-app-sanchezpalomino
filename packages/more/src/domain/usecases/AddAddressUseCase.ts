import { AddressModel } from '@app/common'
import { UserRepository } from '../repository/UserRepository'

export class AddAddressUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(address: AddressModel): Promise<AddressModel> {
    return await this.userRepository.addAddress(address)
  }
}
