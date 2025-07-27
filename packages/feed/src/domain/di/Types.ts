import { Types } from '@app/common'

const $ = {
  ...Types,
  GetFeedUseCase: Symbol.for('GetFeedUseCase'),
  CreatePostUseCase: Symbol.for('CreatePostUseCase'),
  LikePostUseCase: Symbol.for('LikePostUseCase'),
  FeedRepository: Symbol.for('FeedRepository'),
  FeedApi: Symbol.for('FeedApi'),
} as const

export { $ }
