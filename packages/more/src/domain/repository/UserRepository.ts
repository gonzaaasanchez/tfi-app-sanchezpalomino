import { CarerConfig, UserModel } from '@app/common'

export interface UserRepository {
  updateProfile(
    userData: Partial<UserModel>,
    avatarFile?: string
  ): Promise<UserModel>
  updateCarerConfig(carerConfig: CarerConfig): Promise<UserModel>
}
