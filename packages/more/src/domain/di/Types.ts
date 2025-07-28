const $ = {
  UserApi: Symbol.for('UserApi'),
  PetApi: Symbol.for('PetApi'),
  LogoutApi: Symbol.for('LogoutApi'),
  UserRepository: Symbol.for('UserRepository'),
  PetRepository: Symbol.for('PetRepository'),
  LogoutRepository: Symbol.for('LogoutRepository'),
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
  LogoutUseCase: Symbol.for('LogoutUseCase'),
}

export { $ }
