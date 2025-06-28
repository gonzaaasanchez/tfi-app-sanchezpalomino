import { SearchResultModel } from '../../data/models/SearchResultModel'
import SearchResultsRepository from '../repository/SearchResultsRepository'
import { SearchCriteria } from '../../data/models/SearchCriteria'
import { PaginatedResponse, UserModel } from '@packages/common'

class SearchResultsUseCase {
  private searchResultsRepository: SearchResultsRepository

  constructor(searchResultsRepository: SearchResultsRepository) {
    this.searchResultsRepository = searchResultsRepository
  }

  async execute(
    searchCriteria: SearchCriteria,
    page: number,
    limit: number
  ): Promise<PaginatedResponse<SearchResultModel>> {
    const response = await this.searchResultsRepository.searchResults(
      searchCriteria,
      page,
      limit
    )

    // convert the flat objects from the API to class instances so that the getters work
    const convertedItems = response.items.map((item) => ({
      ...item,
      caregiver: new UserModel(item.caregiver),
    }))

    return {
      items: convertedItems,
      pagination: response.pagination,
    }
  }
}

export { SearchResultsUseCase }
