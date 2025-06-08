import { HttpClient } from '@packages/common'
import { SearchResultModel } from '../../models/SearchResultModel'
import { UserModel } from '@packages/common'
import { SearchCriteria } from '../../models/SearchCriteria'

export interface SearchResultsApi {
  getSearchResults(searchCriteria: SearchCriteria): Promise<SearchResultModel[]>
}

export class SearchResultsApiImpl implements SearchResultsApi {
  constructor(private readonly httpClient: HttpClient) {}

  async getSearchResults(searchCriteria: SearchCriteria): Promise<SearchResultModel[]> {
    // TODO: Implement real API call
    // const response = await this.httpClient.post('/search', searchCriteria)
    // return response.data

    // Mock data for testing
    const mockData: SearchResultModel[] = [
      {
        user: new UserModel({
          id: '1',
          firstname: 'María',
          lastname: 'García',
          phoneNumber: '+54 11 1234-5678',
          avatar: 'https://picsum.photos/200?random=1'
        }),
        rate: 4.5,
        reviews: 12
      },
      {
        user: new UserModel({
          id: '2',
          firstname: 'Juan',
          lastname: 'Pérez',
          phoneNumber: '+54 11 2345-6789',
          avatar: 'https://picsum.photos/200?random=2'
        }),
        rate: 4.8,
        reviews: 8
      },
      {
        user: new UserModel({
          id: '3',
          firstname: 'Ana',
          lastname: 'Martínez',
          phoneNumber: '+54 11 3456-7890',
          avatar: 'https://picsum.photos/200?random=3'
        }),
        rate: 4.2,
        reviews: 15
      }
    ]

    return mockData
  }
} 