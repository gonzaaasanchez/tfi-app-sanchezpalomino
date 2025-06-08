import { SearchResultModel } from '../../data/models/SearchResultModel'
import SearchResultsRepository from '../repository/SearchResultsRepository'
import { SearchCriteria } from '../../data/models/SearchCriteria'

class SearchResultsUseCase {
  private searchResultsRepository: SearchResultsRepository

  constructor(searchResultsRepository: SearchResultsRepository) {
    this.searchResultsRepository = searchResultsRepository
  }

  async execute(searchCriteria: SearchCriteria): Promise<SearchResultModel[]> {
    return await this.searchResultsRepository.searchResults(searchCriteria)
  }
}

export { SearchResultsUseCase }
