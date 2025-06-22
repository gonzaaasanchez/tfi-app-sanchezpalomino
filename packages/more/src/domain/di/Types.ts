const $ = {
  UserApi: Symbol.for('UserApi'),
  PetApi: Symbol.for('PetApi'),
  UserRepository: Symbol.for('UserRepository'),
  PetRepository: Symbol.for('PetRepository'),
  UpdateProfileUseCase: Symbol.for('UpdateProfileUseCase'),
  GetMyPetsUseCase: Symbol.for('GetMyPetsUseCase'),
}

export { $ } 