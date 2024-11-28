type PetType = {
  id?: string
  name?: string
}

type PetCharacteristic = {
  id?: string
  characteristic?: string
  value?: string
}

type PetModel = {
  id?: string
  name?: string
  comment?: string
  photoUrl: string
  type?: PetType
  characteristics?: PetCharacteristic[]
}

export { PetModel, PetType, PetCharacteristic }
