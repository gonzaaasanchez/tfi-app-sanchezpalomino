import { Resolver } from '@app/common'
import { GetFeedUseCase } from '../usecases/GetFeedUseCase'
import { CreatePostUseCase } from '../usecases/CreatePostUseCase'
import { FeedRepositoryImpl } from '../../data/repository/FeedRepository'
import { FeedApi } from '../../data/datasource/api/FeedApi'
import { $ } from './Types'

const FeedRegister = (resolver: Resolver): void => {
  resolver.registerSingleton(
    $.FeedApi,
    new FeedApi(resolver.resolve($.HttpClient))
  )
  resolver.registerSingleton(
    $.FeedRepository,
    new FeedRepositoryImpl(resolver.resolve($.FeedApi))
  )
  resolver.registerFactory(
    $.GetFeedUseCase,
    () => new GetFeedUseCase(resolver.resolve($.FeedRepository))
  )
  resolver.registerFactory(
    $.CreatePostUseCase,
    () => new CreatePostUseCase(resolver.resolve($.FeedRepository))
  )
}

export { FeedRegister }
