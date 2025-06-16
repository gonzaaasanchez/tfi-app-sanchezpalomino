import { HttpClient } from '@packages/common'
import { SearchResultModel } from '../../models/SearchResultModel'
import { UserModel } from '@packages/common'
import { SearchCriteria, SortField, SortOrder } from '../../models/SearchCriteria'

export interface SearchResultsApi {
  getSearchResults(searchCriteria: SearchCriteria): Promise<SearchResultModel[]>
}

export class SearchResultsApiImpl implements SearchResultsApi {
  constructor(private readonly httpClient: HttpClient) {}

  async getSearchResults(searchCriteria: SearchCriteria): Promise<SearchResultModel[]> {
    // TODO: Implement real API call
    // const response = await this.httpClient.post('/search', {
    //   ...searchCriteria,
    //   fromDate: new Date(searchCriteria.fromDate),
    //   toDate: new Date(searchCriteria.toDate)
    // })
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
        distance: 30,
        price: {
          fee: 100,
          charge: 10,
          total: 110
        },
        rate: {
          value: 4.5,
          count: 12
        }
      },
      {
        user: new UserModel({
          id: '2',
          firstname: 'Juan',
          lastname: 'Pérez',
          phoneNumber: '+54 11 2345-6789',
          avatar: 'https://picsum.photos/200?random=2'
        }),
        distance: 20,
        price: {
          fee: 200,
          charge: 20,
          total: 220
        },
        rate: {
          value: 4.8,
          count: 8
        }
      },
      {
        user: new UserModel({
          id: '3',
          firstname: 'Ana',
          lastname: 'Martínez',
          phoneNumber: '+54 11 3456-7890',
          avatar: 'https://picsum.photos/200?random=3'
        }),
        distance: 20,
        price: {
          fee: 300,
          charge: 30,
          total: 330
        },
        rate: {
          value: 4.2,
          count: 15
        }
      }
    ]

    // Sort the results based on the criteria
    const sortedResults = [...mockData].sort((a, b) => {
      const { field, order } = searchCriteria.sortBy
      const multiplier = order === SortOrder.ASC ? 1 : -1

      switch (field) {
        case SortField.DISTANCE:
          return (a.distance - b.distance) * multiplier
        case SortField.REVIEWS:
          return (a.rate.value - b.rate.value) * multiplier
        case SortField.TOTAL_PRICE:
          return (a.price.total - b.price.total) * multiplier
        default:
          return 0
      }
    })

    // Add 1 second delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    return sortedResults
  }
} 