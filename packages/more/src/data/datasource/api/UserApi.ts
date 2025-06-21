import { HttpClient, UserModel } from '@app/common'

export interface UserApi {
  updateProfile(userData: Partial<UserModel>): Promise<UserModel>
}

export class UserApiImpl implements UserApi {
  constructor(private httpClient: HttpClient) {}

  async updateProfile(userData: Partial<UserModel>): Promise<UserModel> {
    const response = await this.httpClient.put<UserModel>(`/users/me`, userData)
    return response.data
  }
}
