import { CarerConfig, UserModel, Address } from '@app/common'

export interface UserRepository {
  updateProfile(
    userData: Partial<UserModel>,
    avatarFile?: string
  ): Promise<UserModel>
  updateCarerConfig(carerConfig: CarerConfig): Promise<UserModel>
  addAddress(address: Address): Promise<Address>
  getAddresses(): Promise<Address[]>
}
