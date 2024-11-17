import { Resolver } from '@app/common'

const DetailRegister = (resolver: Resolver): void => {
  resolver.registerSingleton('DetailTest', 'Test Injection')
}

export { DetailRegister }
