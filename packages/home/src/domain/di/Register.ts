import { HomeApi, HomeApiImpl } from '../../data/datasource/api/HomeApi'
import { HomeRepositoryImpl } from '../../data/repository/HomeRepository'
import { Resolver } from '@app/common'
import { $ } from './Types'
import HomeRepository from '../repository/HomeRepository'

const HomeRegister = (resolver: Resolver): void => {
  resolver.registerSingleton<HomeApi>($.HomeApi, new HomeApiImpl())
  resolver.registerSingleton<HomeRepository>(
    $.HomeRepository,
    new HomeRepositoryImpl(resolver.resolve($.HomeApi))
  )
}

export { HomeRegister }
