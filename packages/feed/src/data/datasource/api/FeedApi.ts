import { FeedModel, PaginatedResponse, HttpClient } from '@packages/common'

type CreatePostData = {
  title: string
  description: string
  image: string
}

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

  async createPost(data: CreatePostData): Promise<FeedModel> {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)

    // Add image file
    const imageUri = data.image
    const imageName = imageUri.split('/').pop() || 'image.jpg'
    const imageType = 'image/jpeg'

    formData.append('image', {
      uri: imageUri,
      name: imageName,
      type: imageType,
    } as any)

    const response = await this.httpClient.post<FeedModel>('/posts', formData)
    return response.data
  }
}

export { FeedApi, CreatePostData }
