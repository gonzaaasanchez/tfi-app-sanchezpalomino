import { Resolver } from '@app/common'
import { GetFeedUseCase } from '../usecases/GetFeedUseCase'
import { CreatePostUseCase } from '../usecases/CreatePostUseCase'
import { LikePostUseCase } from '../usecases/LikePostUseCase'
import { FeedRepositoryImpl } from '../../data/repository/FeedRepository'
import { FeedApiImpl, FeedApi } from '../../data/datasource/api/FeedApi'
import { $ } from './Types'
import { FeedRepository } from '../repository/FeedRepository'

const FeedRegister = (resolver: Resolver): void => {
  resolver.registerSingleton<FeedApi>(
    $.FeedApi,
    new FeedApiImpl(resolver.resolve($.HttpClient))
  )
  resolver.registerSingleton<FeedRepository>(
    $.FeedRepository,
    new FeedRepositoryImpl(resolver.resolve($.FeedApi))
  )
  resolver.registerFactory<GetFeedUseCase>(
    $.GetFeedUseCase,
    () => new GetFeedUseCase(resolver.resolve($.FeedRepository))
  )
  resolver.registerFactory<CreatePostUseCase>(
    $.CreatePostUseCase,
    () => new CreatePostUseCase(resolver.resolve($.FeedRepository))
  )
  resolver.registerFactory<LikePostUseCase>(
    $.LikePostUseCase,
    () => new LikePostUseCase(resolver.resolve($.FeedRepository))
  )
}

export { FeedRegister }
