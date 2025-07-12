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
import { AcceptReservationUseCase } from '../usecases/AcceptReservationUseCase'
import { RejectReservationUseCase } from '../usecases/RejectReservationUseCase'
import { CancelReservationUseCase } from '../usecases/CancelReservationUseCase'
import { GetReservationReviewsUseCase } from '../usecases/GetReservationReviewsUseCase'
import { SaveReviewUseCase } from '../usecases/SaveReviewUseCase'
import { PaymentApi, PaymentApiImpl } from '../../data/datasource/api/PaymentApi'
import PaymentRepository from '../repository/PaymentRepository'
import PaymentRepositoryImpl from '../../data/repository/PaymentRepository'
import { CreatePaymentIntentUseCase } from '../usecases/CreatePaymentIntentUseCase'

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
  resolver.registerFactory<AcceptReservationUseCase>(
    $.AcceptReservationUseCase,
    () => new AcceptReservationUseCase(resolver.resolve($.ReservesRepository))
  )
  resolver.registerFactory<RejectReservationUseCase>(
    $.RejectReservationUseCase,
    () => new RejectReservationUseCase(resolver.resolve($.ReservesRepository))
  )
  resolver.registerFactory<CancelReservationUseCase>(
    $.CancelReservationUseCase,
    () => new CancelReservationUseCase(resolver.resolve($.ReservesRepository))
  )
  resolver.registerFactory<GetReservationReviewsUseCase>(
    $.GetReservationReviewsUseCase,
    () =>
      new GetReservationReviewsUseCase(resolver.resolve($.ReservesRepository))
  )
  resolver.registerFactory<SaveReviewUseCase>(
    $.SaveReviewUseCase,
    () => new SaveReviewUseCase(resolver.resolve($.ReservesRepository))
  )
  resolver.registerSingleton<PaymentApi>(
    $.PaymentApi,
    new PaymentApiImpl(resolver.resolve($.HttpClient))
  )
  resolver.registerSingleton<PaymentRepository>(
    $.PaymentRepository,
    new PaymentRepositoryImpl(resolver.resolve($.PaymentApi))
  )
  resolver.registerFactory<CreatePaymentIntentUseCase>(
    $.CreatePaymentIntentUseCase,
    () => new CreatePaymentIntentUseCase(resolver.resolve($.PaymentRepository))
  )
}

export { ReservesRegister }
