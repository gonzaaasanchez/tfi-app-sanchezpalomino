import { Container } from 'inversify'
import { Resolver, Token } from '../../domain/interfaces/Resolver'

/**
 * The ResolverImpl class is a dependency injection resolver that
 * manages the registration and resolution of values for given tokens.
 *
 * @notExported
 */
class ResolverImpl implements Resolver {
  container = new Container()

  /**
   * {@link Resolver.registerSingleton}
   */
  registerSingleton<T>(token: Token<T>, value: T): void {
    this.container.bind<T>(token).toConstantValue(value)
  }

  /**
   * {@link Resolver.registerFactory}
   */
  registerFactory<T>(token: Token<T>, func: () => T): void {
    this.container.bind<T>(token).toDynamicValue(func)
  }

  /**
   * {@link Resolver.resolve}
   */
  resolve<T>(indetifier: Token<T>): T {
    return this.container.get(indetifier)
  }
}

/**
 * Creates a new instance of a dependency injection resolver.
 *
 * @returns {Resolver} - The new resolver instance.
 */
const createResolver = (): Resolver => {
  return new ResolverImpl()
}

export { createResolver }
