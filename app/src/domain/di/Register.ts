import { AuthRegister } from '@app/auth'
import { CommonRegister, createResolver, Resolver, Types } from '@app/common'
import { FeedRegister } from '@app/feed'
import { ReservesRegister } from '@app/reserves'
import { ServicesRegister } from '@app/services'
import { HomeRegister } from '@app/home'
import { LoadsRegister } from '@app/loads'
import { MoreRegister } from '@app/more'
import { DetailRegister } from '@app/detail'

const resolver = createResolver()

const registerDependencies = (): void => {
  AppRegister(resolver)
  CommonRegister(resolver)
  AuthRegister(resolver)
  HomeRegister(resolver)
  FeedRegister(resolver)
  ReservesRegister(resolver)
  ServicesRegister(resolver)
  LoadsRegister(resolver)
  MoreRegister(resolver)
  DetailRegister(resolver)
}

const AppRegister = (resolver: Resolver): void => {
  resolver.registerSingleton(Types.BaseURL, 'https://tfi-backend-sanchezpalomino.onrender.com/api')
}

export { resolver, registerDependencies }
