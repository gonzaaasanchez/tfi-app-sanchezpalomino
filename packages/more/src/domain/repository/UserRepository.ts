import { UserModel } from '@app/common'

export interface UserRepository {
  updateProfile(
    userData: Partial<UserModel>,
    avatarFile?: string
  ): Promise<UserModel>
}
