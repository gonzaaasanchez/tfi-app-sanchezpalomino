import { UserModel, CarerConfig } from '@app/common'
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
}
