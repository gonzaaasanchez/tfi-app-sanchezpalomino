import { Resolver } from '@app/common'
import { AuthApi, AuthApiImpl } from '../../data/datasource/api/AuthApi'
import { LoginUseCase } from '../usecases/LoginUseCase'
import { $ } from './Types'
import AuthRepository from '../repository/AuthRepository'
import { AuthRepositoryImpl } from '../../data/repository/AuthRepository'
import { ForgotPasswordUseCase } from '../usecases/ForgotPasswordUseCase'
import { RegisterUseCase } from '../usecases/RegisterUseCase'

/**
 * Registers the authentication dependencies with the resolver.
 *
 * @param {Resolver} resolver - The dependency injection resolver.
 */
const AuthRegister = (resolver: Resolver): void => {
  /**
   * Registers the AuthApi singleton.
   */
  resolver.registerSingleton<AuthApi>(
    $.AuthApi,
    new AuthApiImpl(resolver.resolve($.HttpClient))
  )
  /**
   * Registers the AuthRepository singleton.
   */
  resolver.registerSingleton<AuthRepository>(
    $.AuthRepository,
    new AuthRepositoryImpl(resolver.resolve($.AuthApi))
  )
  /**
   * Registers the LoginUseCase factory.
   */
  resolver.registerFactory<LoginUseCase>(
    $.LoginUseCase,
    () => new LoginUseCase(resolver.resolve($.AuthRepository))
  )
  /**
   * Registers the RegisterUseCase factory.
   */
  resolver.registerFactory<RegisterUseCase>(
    $.RegisterUseCase,
    () => new RegisterUseCase(resolver.resolve($.AuthRepository))
  )
  /**
   * Registers the ForgotPasswordUseCase factory.
   */
  resolver.registerFactory<ForgotPasswordUseCase>(
    $.ForgotPasswordUseCase,
    () => new ForgotPasswordUseCase(resolver.resolve($.AuthRepository))
  )
}

export { AuthRegister }
