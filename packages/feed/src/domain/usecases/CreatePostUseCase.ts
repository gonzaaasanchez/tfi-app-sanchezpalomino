import { FeedModel } from '@packages/common'
import { FeedRepository } from '../repository/FeedRepository'

type CreatePostData = {
  title: string
  description: string
  image: string
}

class CreatePostUseCase {
  private feedRepository: FeedRepository

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository
  }

  async execute(data: CreatePostData): Promise<FeedModel> {
    return await this.feedRepository.createPost(data)
  }
}

export { CreatePostUseCase, CreatePostData }
