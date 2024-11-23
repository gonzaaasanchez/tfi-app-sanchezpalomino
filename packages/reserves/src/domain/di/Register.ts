import { Resolver } from '@app/common'
import {
  ReservesApi,
  ReservesApiImpl,
} from '../../data/datasource/api/ReservesApi'
import { $ } from './Types'
import ReservesRepository from '../repository/ReservesRepository'
import { ReservesRepositoryImpl } from '../../data/repository/ReservesRepository'
import { GetReservesUseCase } from '../usecases/GetReservesUseCase'

const ReservesRegister = (resolver: Resolver): void => {
  resolver.registerSingleton<ReservesApi>(
    $.ReservesApi,
    new ReservesApiImpl(resolver.resolve($.HttpClient))
  )
  resolver.registerSingleton<ReservesRepository>(
    $.ReservesRepository,
    new ReservesRepositoryImpl(resolver.resolve($.ReservesApi))
  )
  resolver.registerFactory<GetReservesUseCase>(
    $.GetReservesUseCase,
    () => new GetReservesUseCase(resolver.resolve($.ReservesRepository))
  )
}

export { ReservesRegister }
