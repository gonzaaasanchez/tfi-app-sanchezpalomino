import SearchResultsRepository from '../../domain/repository/SearchResultsRepository'
import { SearchResultModel } from '../models/SearchResultModel'
import { SearchResultsApi } from '../datasource/api/SearchResultsApi'
import { SearchCriteria } from '../models/SearchCriteria'
import { PaginatedResponse } from '@packages/common'

class SearchResultsRepositoryImpl implements SearchResultsRepository {
  private readonly api: SearchResultsApi

  constructor(api: SearchResultsApi) {
    this.api = api
  }

  async searchResults(
    searchCriteria: SearchCriteria
  ): Promise<PaginatedResponse<SearchResultModel>> {
    return this.api.getSearchResults(searchCriteria)
  }
}

export { SearchResultsRepositoryImpl }
