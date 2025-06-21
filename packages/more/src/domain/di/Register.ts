import { Resolver, Types } from '@app/common'
import { UserApi, UserApiImpl } from '../../data/datasource/api/UserApi'
import { UserRepositoryImpl } from '../../data/repository/UserRepository'
import { UserRepository } from '../../domain/repository/UserRepository'
import { UpdateProfileUseCase } from '../usecases/UpdateProfileUseCase'
import { $ } from './Types'

const MoreRegister = (resolver: Resolver): void => {
  // API
  resolver.registerSingleton<UserApi>(
    $.UserApi,
    new UserApiImpl(resolver.resolve(Types.HttpClient))
  )

  // Repository
  resolver.registerSingleton<UserRepository>(
    $.UserRepository,
    new UserRepositoryImpl(resolver.resolve($.UserApi))
  )

  // Use Cases
  resolver.registerSingleton<UpdateProfileUseCase>(
    $.UpdateProfileUseCase,
    new UpdateProfileUseCase(resolver.resolve($.UserRepository))
  )
}

export { MoreRegister }
