import {
  HttpClient,
  UserModel,
  CarerConfig,
  AddressModel,
  createFileInfo,
  isValidImageUri,
} from '@app/common'

export interface UserApi {
  updateProfile(
    userData: Partial<UserModel>,
    avatarFile?: string
  ): Promise<UserModel>
  updateCarerConfig(carerConfig: CarerConfig): Promise<UserModel>
  addAddress(address: AddressModel): Promise<AddressModel>
  getAddresses(): Promise<AddressModel[]>
  deleteAddress(addressId: string): Promise<void>
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
    // Convert PetType objects to IDs for backend
    const backendCarerConfig = {
      ...carerConfig,
      petTypes: carerConfig.petTypes?.map((type) => type._id || '') || [],
    }

    const response = await this.httpClient.put<UserModel>(
      '/users/me/carer-config',
      {
        carerConfig: backendCarerConfig,
      }
    )
    return response.data
  }

  async addAddress(address: AddressModel): Promise<AddressModel> {
    const isUpdate = !!address._idr
    const url = isUpdate ? `/users/me/addresses/${address._id}` : '/users/me/addresses'
    const method = isUpdate ? 'put' : 'post'
    
    const response = await this.httpClient[method]<AddressModel>(url, address)
    return response.data
  }

  async getAddresses(): Promise<AddressModel[]> {
    const response = await this.httpClient.get<AddressModel[]>(
      '/users/me/addresses'
    )
    return response.data
  }

  async deleteAddress(addressId: string): Promise<void> {
    await this.httpClient.delete(`/users/me/addresses/${addressId}`)
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
