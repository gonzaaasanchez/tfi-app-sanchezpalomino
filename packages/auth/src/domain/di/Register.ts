import { Resolver } from '@app/common'
import { AuthApi, AuthApiImpl } from '../../data/datasource/api/AuthApi'
import { LoginUseCase } from '../usecases/LoginUseCase'
import { $ } from './Types'
import AuthRepository from '../repository/AuthRepository'
import { AuthRepositoryImpl } from '../../data/repository/AuthRepository'
import { ForgotPasswordUseCase } from '../usecases/ForgotPasswordUseCase'
import { RegisterUseCase } from '../usecases/RegisterUseCase'

const AuthRegister = (resolver: Resolver): void => {
  resolver.registerSingleton<AuthApi>(
    $.AuthApi,
    new AuthApiImpl(resolver.resolve($.HttpClient))
  )
  resolver.registerSingleton<AuthRepository>(
    $.AuthRepository,
    new AuthRepositoryImpl(resolver.resolve($.AuthApi))
  )
  resolver.registerFactory<LoginUseCase>(
    $.LoginUseCase,
    () => new LoginUseCase(resolver.resolve($.AuthRepository))
  )
  resolver.registerFactory<RegisterUseCase>(
    $.RegisterUseCase,
    () => new RegisterUseCase(resolver.resolve($.AuthRepository))
  )
  resolver.registerFactory<ForgotPasswordUseCase>(
    $.ForgotPasswordUseCase,
    () => new ForgotPasswordUseCase(resolver.resolve($.AuthRepository))
  )
}

export { AuthRegister }
