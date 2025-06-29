import { getImageFullUrl } from '../../utils/ImageUtils'

type PetType = {
  id?: string
  name?: string
}

type PetCharacteristic = {
  id?: string
  name?: string
  value?: string // user in creation form
}

type PetModel = {
  id?: string
  name?: string
  comment?: string
  avatar?: string
  petType?: PetType
  characteristics?: PetCharacteristic[]
}

export { PetModel, PetType, PetCharacteristic }
