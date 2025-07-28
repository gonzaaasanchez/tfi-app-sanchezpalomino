import { FeedModel, CommentModel } from '@packages/common'
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
  getFeedComments(
    postId: string,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<CommentModel>>
  createComment(postId: string, comment: string): Promise<CommentModel>
}

export { FeedRepository, CreatePostData }
