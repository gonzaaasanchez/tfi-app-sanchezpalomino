import { Types } from '@app/common'

const $ = {
  ...Types,
  GetFeedUseCase: Symbol.for('GetFeedUseCase'),
  FeedRepository: Symbol.for('FeedRepository'),
  FeedApi: Symbol.for('FeedApi'),
} as const

export { $ }
