import SearchResultsRepository from '../../domain/repository/SearchResultsRepository'
import { SearchResultModel } from '../models/SearchResultModel'
import { SearchResultsApi } from '../datasource/api/SearchResultsApi'
import { SearchCriteria } from '../models/SearchCriteria'

class SearchResultsRepositoryImpl implements SearchResultsRepository {
  private readonly api: SearchResultsApi

  constructor(api: SearchResultsApi) {
    this.api = api
  }

  async searchResults(searchCriteria: SearchCriteria): Promise<SearchResultModel[]> {
    return this.api.getSearchResults(searchCriteria)
  }
}

export { SearchResultsRepositoryImpl }
