import { HttpClient, Resolver } from '@app/common'
import { AxiosHttpClient } from '../../data/http/HttpClient'
import { $ } from './Types'

/**
 * Registers the application's common dependencies.
 *
 * The common dependencies are:
 * * $.HttpClient: The HTTP client to use for all API requests.
 *
 * @param {Resolver} resolver - The resolver to register the dependencies with.
 *
 * @return {void} This function does not return anything.
 */
const CommonRegister = (resolver: Resolver): void => {
  resolver.registerSingleton<HttpClient>(
    $.HttpClient,
    new AxiosHttpClient(resolver.resolve($.BaseURL) + '/api')
  )
}

export { CommonRegister }
