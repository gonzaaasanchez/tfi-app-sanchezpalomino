type PetType = {
  _id?: string
  name?: string
}

type PetCharacteristic = {
  _id?: string
  name?: string
}

type PetModel = {
  id?: string
  name?: string
  comment?: string
  photoUrl?: string
  petType?: PetType
  characteristics?: PetCharacteristic[]
}

export { PetModel, PetType, PetCharacteristic }
