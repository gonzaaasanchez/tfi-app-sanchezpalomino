import { Resolver } from '@app/common'

const MoreRegister = (resolver: Resolver): void => {
  resolver.registerSingleton('MoreTest', 'Test Injection')
}

export { MoreRegister }
