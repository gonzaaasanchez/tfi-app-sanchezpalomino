import { FeedModel } from '@packages/common'
import { PaginatedResponse } from '@packages/common'
import { FeedRepository as IFeedRepository, CreatePostData } from '../../domain/repository/FeedRepository'
import { FeedApi } from '../datasource/api/FeedApi'

class FeedRepositoryImpl implements IFeedRepository {
  private feedApi: FeedApi

  constructor(feedApi: FeedApi) {
    this.feedApi = feedApi
  }

  async getFeed(page?: number, limit?: number): Promise<PaginatedResponse<FeedModel>> {
    return await this.feedApi.getFeed(page, limit)
  }

  async createPost(data: CreatePostData): Promise<FeedModel> {
    return await this.feedApi.createPost(data)
  }
}

export { FeedRepositoryImpl }
