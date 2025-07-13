import { Types } from '@app/common'

const $ = {
  ...Types,
  GetFeedUseCase: Symbol.for('GetFeedUseCase'),
  CreatePostUseCase: Symbol.for('CreatePostUseCase'),
  FeedRepository: Symbol.for('FeedRepository'),
  FeedApi: Symbol.for('FeedApi'),
} as const

export { $ }
