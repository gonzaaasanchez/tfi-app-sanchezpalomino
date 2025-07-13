import { FeedModel } from '@packages/common'
import { PaginatedResponse } from '@packages/common'
import { FeedRepository } from '../repository/FeedRepository'

class GetFeedUseCase {
  private feedRepository: FeedRepository

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository
  }

  async execute(page?: number, limit?: number): Promise<PaginatedResponse<FeedModel>> {
    return await this.feedRepository.getFeed(page, limit)
  }
}

export { GetFeedUseCase } 