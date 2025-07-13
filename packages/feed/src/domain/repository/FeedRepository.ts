import { FeedModel } from '@packages/common'
import { PaginatedResponse } from '@packages/common'

interface FeedRepository {
  getFeed(page?: number, limit?: number): Promise<PaginatedResponse<FeedModel>>
}

export { FeedRepository }
