import { CommentModel } from '@packages/common'
import { PaginatedResponse } from '@packages/common'
import { FeedRepository } from '../repository/FeedRepository'

class GetFeedCommentsUseCase {
  private feedRepository: FeedRepository

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository
  }

  async execute(
    postId: string,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<CommentModel>> {
    return await this.feedRepository.getFeedComments(postId, page, limit)
  }
}

export { GetFeedCommentsUseCase }
