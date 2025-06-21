import { UserModel } from '@app/common'
import { UserRepository } from '../repository/UserRepository'

export class UpdateProfileUseCase {
  constructor(private repository: UserRepository) {}

  async execute(userData: Partial<UserModel>): Promise<UserModel> {
    return await this.repository.updateProfile(userData)
  }
} 