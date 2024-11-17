import { Resolver } from '@app/common'

const FactoringRegister = (resolver: Resolver): void => {
  resolver.registerSingleton('FactoringTest', 'Test Injection')
}

export { FactoringRegister }
