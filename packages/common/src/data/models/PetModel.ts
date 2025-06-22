import { getImageFullUrl } from '../../utils/ImageUtils'

type PetType = {
  _id?: string
  name?: string
}

type PetCharacteristic = {
  _id?: string
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
