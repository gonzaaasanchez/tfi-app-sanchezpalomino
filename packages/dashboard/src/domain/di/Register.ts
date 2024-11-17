import { Resolver } from '@app/common'

const DashboardRegister = (resolver: Resolver): void => {
  resolver.registerSingleton('DashboardTest', 'Test Injection')
}

export { DashboardRegister }
