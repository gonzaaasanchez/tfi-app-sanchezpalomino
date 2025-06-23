import { CarerConfig, UserModel, AddressModel } from '@app/common'

export interface UserRepository {
  updateProfile(
    userData: Partial<UserModel>,
    avatarFile?: string
  ): Promise<UserModel>
  updateCarerConfig(carerConfig: CarerConfig): Promise<UserModel>
  addAddress(address: AddressModel): Promise<AddressModel>
  getAddresses(): Promise<AddressModel[]>
}
