const $ = {
  UserApi: Symbol.for('UserApi'),
  PetApi: Symbol.for('PetApi'),
  UserRepository: Symbol.for('UserRepository'),
  PetRepository: Symbol.for('PetRepository'),
  UpdateProfileUseCase: Symbol.for('UpdateProfileUseCase'),
  UpdateCarerConfigUseCase: Symbol.for('UpdateCarerConfigUseCase'),
  AddAddressUseCase: Symbol.for('AddAddressUseCase'),
  GetAddressesUseCase: Symbol.for('GetAddressesUseCase'),
  DeleteAddressUseCase: Symbol.for('DeleteAddressUseCase'),
  GetMyPetsUseCase: Symbol.for('GetMyPetsUseCase'),
  GetPetTypesUseCase: Symbol.for('GetPetTypesUseCase'),
  GetPetCharacteristicsUseCase: Symbol.for('GetPetCharacteristicsUseCase'),
  SavePetUseCase: Symbol.for('SavePetUseCase'),
  DeletePetUseCase: Symbol.for('DeletePetUseCase'),
}

export { $ }
