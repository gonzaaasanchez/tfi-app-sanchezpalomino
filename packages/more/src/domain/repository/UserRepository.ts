import { UserModel } from '@app/common'

export interface UserRepository {
  updateProfile(userData: Partial<UserModel>): Promise<UserModel>
} 