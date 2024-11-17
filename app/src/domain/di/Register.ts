import { AuthRegister } from '@app/auth'
import { CommonRegister, createResolver, Resolver, Types } from '@app/common'
import { DashboardRegister } from '@app/dashboard'
import { FactoringRegister } from '@app/factoring'
import { FuelingRegister } from '@app/fueling'
import { HomeRegister } from '@app/home'
import { LoadsRegister } from '@app/loads'
import { MoreRegister } from '@app/more'
import { DetailRegister } from '@app/detail'

// Create the resolver.
const resolver = createResolver()

/**
 * Registers all dependencies in the application.
 *
 * @return {void} This function does not return anything.
 */
const registerDependencies = (): void => {
  AppRegister(resolver)
  CommonRegister(resolver)
  AuthRegister(resolver)
  HomeRegister(resolver)
  DashboardRegister(resolver)
  FactoringRegister(resolver)
  FuelingRegister(resolver)
  LoadsRegister(resolver)
  MoreRegister(resolver)
  DetailRegister(resolver)
}

/**
 * Registers the application's dependencies.
 *
 * The application's dependencies are:
 * * $.BaseURL: The base URL to use for all API requests.
 *
 * @param {Resolver} resolver - The resolver to register the dependencies with.
 *
 * @return {void} This function does not return anything.
 * @notExported
 */
const AppRegister = (resolver: Resolver): void => {
  resolver.registerSingleton(Types.BaseURL, 'https://reqres.in/api')
}

export { resolver, registerDependencies }
