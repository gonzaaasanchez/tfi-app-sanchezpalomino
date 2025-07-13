import { FeedModel, PaginatedResponse, HttpClient } from '@packages/common'

class FeedApi {
  private httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async getFeed(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<FeedModel>> {
    const params = new URLSearchParams()
    if (page) params.append('page', page.toString())
    if (limit) params.append('limit', limit.toString())

    const response = await this.httpClient.get<PaginatedResponse<FeedModel>>(
      `/posts?${params.toString()}`
    )

    return response.data
  }
}

export { FeedApi }
