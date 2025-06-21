import { UserModel } from '@app/common'
import { UserRepository } from '../../domain/repository/UserRepository'
import { UserApi } from '../datasource/api/UserApi'


export class UserRepositoryImpl implements UserRepository {
  constructor(private api: UserApi) {}

  async updateProfile(userData: Partial<UserModel>): Promise<UserModel> {
    const response = await this.api.updateProfile(userData)
    return new UserModel(response)
  }
} 