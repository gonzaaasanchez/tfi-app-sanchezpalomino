type Token<T> = string | symbol | (new (...args: unknown[]) => T)

/**
 * Interface for a dependency injection resolver.
 */
interface Resolver {
  /**
   * Registers a value as a singleton instance for a given token.
   *
   * @param token The token to register the value for.
   * @param value The value to register.
   */
  registerSingleton<T>(token: Token<T>, value: T): void
  /**
   * Registers a factory function for a given token.
   *
   * @param token The token to register the factory for.
   * @param func The factory function to register.
   */
  registerFactory<T>(token: Token<T>, func: () => T): void
  /**
   * Resolves a value for a given token.
   *
   * @param token The token to resolve.
   * @returns The resolved value.
   */
  resolve<T>(token: Token<T>): T
}

export { Resolver, Token }
