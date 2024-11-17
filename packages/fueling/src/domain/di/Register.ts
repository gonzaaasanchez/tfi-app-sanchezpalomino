import { Resolver } from '@app/common'

const FuelingRegister = (resolver: Resolver): void => {
  resolver.registerSingleton('FuelingTest', 'Test Injection')
}

export { FuelingRegister }
