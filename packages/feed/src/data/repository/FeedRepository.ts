import { FeedModel, CommentModel } from '@packages/common'
import { PaginatedResponse } from '@packages/common'
import {
  FeedRepository,
  CreatePostData,
} from '../../domain/repository/FeedRepository'
import { FeedApi } from '../datasource/api/FeedApi'

class FeedRepositoryImpl implements FeedRepository {
  private feedApi: FeedApi

  constructor(feedApi: FeedApi) {
    this.feedApi = feedApi
  }

  async getFeed(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<FeedModel>> {
    return await this.feedApi.getFeed(page, limit)
  }

  async createPost(data: CreatePostData): Promise<FeedModel> {
    return await this.feedApi.createPost(data)
  }

  async likePost(postId: string, shouldDelete: boolean): Promise<FeedModel> {
    return await this.feedApi.likePost(postId, shouldDelete)
  }

  async getFeedComments(
    postId: string,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<CommentModel>> {
    return await this.feedApi.getFeedComments(postId, page, limit)
  }

  async createComment(postId: string, comment: string): Promise<CommentModel> {
    return await this.feedApi.createComment(postId, comment)
  }
}

export { FeedRepositoryImpl }
