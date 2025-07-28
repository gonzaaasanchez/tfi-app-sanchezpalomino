import { CommentModel } from '@packages/common'
import { FeedRepository } from '../repository/FeedRepository'

class CreateCommentUseCase {
  private feedRepository: FeedRepository

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository
  }

  async execute(postId: string, comment: string): Promise<CommentModel> {
    return await this.feedRepository.createComment(postId, comment)
  }
}

export { CreateCommentUseCase }
