import {
  HttpClient,
  PetModel,
  PaginatedResponse,
  PetType,
  PetCharacteristic,
  buildPaginatedUrl,
  createFileInfo,
  isValidImageUri,
} from '@app/common'

export interface PetApi {
  getMyPets(page?: number, limit?: number): Promise<PaginatedResponse<PetModel>>
  getPetTypes(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetType>>
  getPetCharacteristics(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetCharacteristic>>
  savePet(pet: PetModel, avatarFile?: string | null): Promise<PetModel>
  deletePet(petId: string): Promise<void>
}

export class PetApiImpl implements PetApi {
  constructor(private httpClient: HttpClient) {}

  async getMyPets(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetModel>> {
    const url = buildPaginatedUrl('/pets/my', { page, limit })
    const response = await this.httpClient.get<PaginatedResponse<PetModel>>(url)
    return response.data
  }

  async getPetTypes(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetType>> {
    const url = buildPaginatedUrl('/pet-types', { page, limit })
    const response = await this.httpClient.get<PaginatedResponse<PetType>>(url)
    return response.data
  }

  async getPetCharacteristics(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<PetCharacteristic>> {
    const url = buildPaginatedUrl('/pet-characteristics', { page, limit })
    const response =
      await this.httpClient.get<PaginatedResponse<PetCharacteristic>>(url)
    return response.data
  }

  async savePet(pet: PetModel, avatarFile?: string | null): Promise<PetModel> {
    const isUpdate = !!pet.id

    if (avatarFile) {
      return this.savePetWithAvatar(pet, avatarFile, isUpdate)
    } else {
      return this.savePetWithoutAvatar(pet, isUpdate)
    }
  }

  private async savePetWithAvatar(
    pet: PetModel,
    avatarFile: string,
    isUpdate: boolean
  ): Promise<PetModel> {
    if (!isValidImageUri(avatarFile)) {
      throw new Error(
        'Formato de archivo de imagen inválido. Por favor selecciona un archivo de imagen válido.'
      )
    }

    const formData = new FormData()

    // Construir el body según la estructura especificada
    const petBody = {
      name: pet.name,
      comment: pet.comment,
      petTypeId: pet.petType?._id,
      characteristics:
        pet.characteristics?.map((char) => ({
          characteristicId: char._id,
          value: char.value,
        })) || [],
    }

    // Agregar los campos del body al FormData
    Object.keys(petBody).forEach((key) => {
      const value = petBody[key as keyof typeof petBody]
      if (value !== undefined && value !== null) {
        if (key === 'characteristics') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, String(value))
        }
      }
    })

    // Agregar el archivo de avatar
    const fileInfo = createFileInfo(avatarFile, 'avatar')
    formData.append('avatarFile', fileInfo as any)

    const url = isUpdate ? `/pets/${pet.id}` : '/pets'
    const method = isUpdate ? 'put' : 'post'

    const response = await this.httpClient[method]<PetModel>(url, formData)
    return response.data
  }

  private async savePetWithoutAvatar(
    pet: PetModel,
    isUpdate: boolean
  ): Promise<PetModel> {
    // Construir el body según la estructura especificada
    const petBody = {
      name: pet.name,
      comment: pet.comment,
      petTypeId: pet.petType?._id,
      characteristics:
        pet.characteristics?.map((char) => ({
          characteristicId: char._id,
          value: char.value,
        })) || [],
    }

    const url = isUpdate ? `/pets/${pet.id}` : '/pets'
    const method = isUpdate ? 'put' : 'post'

    const response = await this.httpClient[method]<PetModel>(url, petBody)
    return response.data
  }

  async deletePet(petId: string): Promise<void> {
    const url = `/pets/${petId}`
    await this.httpClient.delete(url)
  }
}
