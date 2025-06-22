import {
  HttpClient,
  UserModel,
  CarerConfig,
  Address,
  createFileInfo,
  isValidImageUri,
} from '@app/common'

export interface UserApi {
  updateProfile(
    userData: Partial<UserModel>,
    avatarFile?: string
  ): Promise<UserModel>
  updateCarerConfig(carerConfig: CarerConfig): Promise<UserModel>
  addAddress(address: Address): Promise<Address>
  getAddresses(): Promise<Address[]>
}

export class UserApiImpl implements UserApi {
  constructor(private httpClient: HttpClient) {}

  async updateProfile(
    userData: Partial<UserModel>,
    avatarFile?: string
  ): Promise<UserModel> {
    if (avatarFile) {
      return this.updateProfileWithAvatar(userData, avatarFile)
    } else {
      return this.updateProfileWithoutAvatar(userData)
    }
  }

  async updateCarerConfig(carerConfig: CarerConfig): Promise<UserModel> {
    const response = await this.httpClient.put<UserModel>(
      '/users/me/carer-config',
      {
        carerConfig,
      }
    )
    return response.data
  }

  async addAddress(address: Address): Promise<Address> {
    const response = await this.httpClient.post<Address>(
      '/users/me/addresses',
      address
    )
    return response.data
  }

  async getAddresses(): Promise<Address[]> {
    const response = await this.httpClient.get<Address[]>('/users/me/addresses')
    return response.data
  }

  private async updateProfileWithAvatar(
    userData: Partial<UserModel>,
    avatarFile: string
  ): Promise<UserModel> {
    if (!isValidImageUri(avatarFile)) {
      throw new Error(
        'Formato de archivo de imagen inválido. Por favor selecciona un archivo de imagen válido.'
      )
    }

    const formData = new FormData()

    // Exclude avatar if there's an avatarFile
    Object.keys(userData).forEach((key) => {
      const value = userData[key as keyof UserModel]
      if (value !== undefined && value !== null && key !== 'avatar') {
        formData.append(key, String(value))
      }
    })

    const fileInfo = createFileInfo(avatarFile, 'avatar')
    formData.append('avatarFile', fileInfo as any)

    const response = await this.httpClient.put<UserModel>(`/users/me`, formData)
    return response.data
  }

  private async updateProfileWithoutAvatar(
    userData: Partial<UserModel>
  ): Promise<UserModel> {
    // If no avatarFile, send as normal JSON
    const response = await this.httpClient.put<UserModel>(`/users/me`, userData)
    return response.data
  }
}
