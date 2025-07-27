import { Types } from '@app/common'

const $ = {
  ...Types,
  GetFeedUseCase: Symbol.for('GetFeedUseCase'),
  CreatePostUseCase: Symbol.for('CreatePostUseCase'),
  LikePostUseCase: Symbol.for('LikePostUseCase'),
  GetFeedCommentsUseCase: Symbol.for('GetFeedCommentsUseCase'),
  CreateCommentUseCase: Symbol.for('CreateCommentUseCase'),
  FeedRepository: Symbol.for('FeedRepository'),
  FeedApi: Symbol.for('FeedApi'),
} as const

export { $ }
