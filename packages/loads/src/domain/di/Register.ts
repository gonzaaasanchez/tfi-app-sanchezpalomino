import { Resolver } from '@app/common'

const LoadsRegister = (resolver: Resolver): void => {
  resolver.registerSingleton('LoadsTest', 'Test Injection')
}

export { LoadsRegister }
