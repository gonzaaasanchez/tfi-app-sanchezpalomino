import { FeedRepository } from '../repository/FeedRepository'
import { FeedModel } from '@packages/common'

class LikePostUseCase {
  private feedRepository: FeedRepository

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository
  }

  async execute(postId: string, shouldDelete: boolean): Promise<FeedModel> {
    return await this.feedRepository.likePost(postId, shouldDelete)
  }
}

export { LikePostUseCase }
