import { Resolver } from '@app/common'
import {
  ReservesApi,
  ReservesApiImpl,
} from '../../data/datasource/api/ReservesApi'
import { $ } from './Types'
import ReservesRepository from '../repository/ReservesRepository'
import { ReservesRepositoryImpl } from '../../data/repository/ReservesRepository'
import { GetReservesUseCase } from '../usecases/GetReservesUseCase'
import {
  SearchResultsApi,
  SearchResultsApiImpl,
} from '../../data/datasource/api/SearchResultsApi'
import SearchResultsRepository from '../repository/SearchResultsRepository'
import { SearchResultsRepositoryImpl } from '../../data/repository/SearchResultsRepository'
import { SearchResultsUseCase } from '../usecases/SearchResultsUseCase'
import { CreateReservationUseCase } from '../usecases/CreateReservationUseCase'

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
  resolver.registerSingleton<SearchResultsApi>(
    $.SearchResultsApi,
    new SearchResultsApiImpl(resolver.resolve($.HttpClient))
  )
  resolver.registerSingleton<SearchResultsRepository>(
    $.SearchResultsRepository,
    new SearchResultsRepositoryImpl(resolver.resolve($.SearchResultsApi))
  )
  resolver.registerFactory<SearchResultsUseCase>(
    $.SearchResultsUseCase,
    () => new SearchResultsUseCase(resolver.resolve($.SearchResultsRepository))
  )
  resolver.registerFactory<CreateReservationUseCase>(
    $.CreateReservationUseCase,
    () => new CreateReservationUseCase(resolver.resolve($.ReservesRepository))
  )
}

export { ReservesRegister }
