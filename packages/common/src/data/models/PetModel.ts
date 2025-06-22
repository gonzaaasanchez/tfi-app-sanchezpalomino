type PetType = {
  id?: string
  name?: string
}

type PetCharacteristic = {
  id?: string
  name?: string
  value?: string
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
