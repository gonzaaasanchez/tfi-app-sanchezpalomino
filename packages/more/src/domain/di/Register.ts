import { Resolver, Types } from '@app/common'
import { UserApi, UserApiImpl } from '../../data/datasource/api/UserApi'
import { UserRepositoryImpl } from '../../data/repository/UserRepository'
import { UserRepository } from '../../domain/repository/UserRepository'
import { UpdateProfileUseCase } from '../usecases/UpdateProfileUseCase'
import { UpdateCarerConfigUseCase } from '../usecases/UpdateCarerConfigUseCase'
import { AddAddressUseCase } from '../usecases/AddAddressUseCase'
import { PetApi, PetApiImpl } from '../../data/datasource/api/PetApi'
import { PetRepositoryImpl } from '../../data/repository/PetRepository'
import { PetRepository } from '../../domain/repository/PetRepository'
import { GetMyPetsUseCase } from '../usecases/GetMyPetsUseCase'
import { GetPetTypesUseCase } from '../usecases/GetPetTypesUseCase'
import { GetPetCharacteristicsUseCase } from '../usecases/GetPetCharacteristicsUseCase'
import { SavePetUseCase } from '../usecases/SavePetUseCase'
import { DeletePetUseCase } from '../usecases/DeletePetUseCase'
import { $ } from './Types'

const MoreRegister = (resolver: Resolver): void => {
  // API
  resolver.registerSingleton<UserApi>(
    $.UserApi,
    new UserApiImpl(resolver.resolve(Types.HttpClient))
  )

  resolver.registerSingleton<PetApi>(
    $.PetApi,
    new PetApiImpl(resolver.resolve(Types.HttpClient))
  )

  // Repository
  resolver.registerSingleton<UserRepository>(
    $.UserRepository,
    new UserRepositoryImpl(resolver.resolve($.UserApi))
  )

  resolver.registerSingleton<PetRepository>(
    $.PetRepository,
    new PetRepositoryImpl(resolver.resolve($.PetApi))
  )

  // Use Cases
  resolver.registerSingleton<UpdateProfileUseCase>(
    $.UpdateProfileUseCase,
    new UpdateProfileUseCase(resolver.resolve($.UserRepository))
  )

  resolver.registerSingleton<UpdateCarerConfigUseCase>(
    $.UpdateCarerConfigUseCase,
    new UpdateCarerConfigUseCase(resolver.resolve($.UserRepository))
  )

  resolver.registerSingleton<AddAddressUseCase>(
    $.AddAddressUseCase,
    new AddAddressUseCase(resolver.resolve($.UserRepository))
  )

  resolver.registerSingleton<GetMyPetsUseCase>(
    $.GetMyPetsUseCase,
    new GetMyPetsUseCase(resolver.resolve($.PetRepository))
  )

  resolver.registerSingleton<GetPetTypesUseCase>(
    $.GetPetTypesUseCase,
    new GetPetTypesUseCase(resolver.resolve($.PetRepository))
  )

  resolver.registerSingleton<GetPetCharacteristicsUseCase>(
    $.GetPetCharacteristicsUseCase,
    new GetPetCharacteristicsUseCase(resolver.resolve($.PetRepository))
  )

  resolver.registerSingleton<SavePetUseCase>(
    $.SavePetUseCase,
    new SavePetUseCase(resolver.resolve($.PetRepository))
  )

  resolver.registerSingleton<DeletePetUseCase>(
    $.DeletePetUseCase,
    new DeletePetUseCase(resolver.resolve($.PetRepository))
  )
}

export { MoreRegister }
