import { Resolver } from '@app/common'
import { GetFeedUseCase } from '../usecases/GetFeedUseCase'
import { FeedRepositoryImpl } from '../../data/repository/FeedRepository'
import { FeedApi } from '../../data/datasource/api/FeedApi'
import { $ } from './Types'

const FeedRegister = (resolver: Resolver): void => {
  // Register API
  resolver.registerSingleton(
    $.FeedApi,
    new FeedApi(resolver.resolve($.HttpClient))
  )

  // Register Repository
  resolver.registerSingleton(
    $.FeedRepository,
    new FeedRepositoryImpl(resolver.resolve($.FeedApi))
  )

  // Register Use Case
  resolver.registerFactory(
    $.GetFeedUseCase,
    () => new GetFeedUseCase(resolver.resolve($.FeedRepository))
  )
}

export { FeedRegister }
