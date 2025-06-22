const $ = {
  UserApi: Symbol.for('UserApi'),
  PetApi: Symbol.for('PetApi'),
  UserRepository: Symbol.for('UserRepository'),
  PetRepository: Symbol.for('PetRepository'),
  UpdateProfileUseCase: Symbol.for('UpdateProfileUseCase'),
  GetMyPetsUseCase: Symbol.for('GetMyPetsUseCase'),
  GetPetTypesUseCase: Symbol.for('GetPetTypesUseCase'),
  GetPetCharacteristicsUseCase: Symbol.for('GetPetCharacteristicsUseCase'),
  SavePetUseCase: Symbol.for('SavePetUseCase'),
}

export { $ }
