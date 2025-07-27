import { FeedModel } from '@packages/common'
import { PaginatedResponse } from '@packages/common'

type CreatePostData = {
  title: string
  description: string
  image: string
}

interface FeedRepository {
  getFeed(page?: number, limit?: number): Promise<PaginatedResponse<FeedModel>>
  createPost(data: CreatePostData): Promise<FeedModel>
  likePost(postId: string, shouldDelete: boolean): Promise<FeedModel>
}

export { FeedRepository, CreatePostData }
