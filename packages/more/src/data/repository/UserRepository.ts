import { UserModel, CarerConfig, AddressModel } from '@app/common'
import { UserRepository } from '../../domain/repository/UserRepository'
import { UserApi } from '../datasource/api/UserApi'

export class UserRepositoryImpl implements UserRepository {
  constructor(private api: UserApi) {}

  async updateProfile(
    userData: Partial<UserModel>,
    avatarFile?: string
  ): Promise<UserModel> {
    const response = await this.api.updateProfile(userData, avatarFile)
    return new UserModel(response)
  }

  async updateCarerConfig(carerConfig: CarerConfig): Promise<UserModel> {
    const response = await this.api.updateCarerConfig(carerConfig)
    return new UserModel(response)
  }

  async addAddress(address: AddressModel): Promise<AddressModel> {
    const response = await this.api.addAddress(address)
    return response
  }

  async getAddresses(): Promise<AddressModel[]> {
    const response = await this.api.getAddresses()
    return response
  }

  async deleteAddress(addressId: string): Promise<void> {
    await this.api.deleteAddress(addressId)
  }
}
