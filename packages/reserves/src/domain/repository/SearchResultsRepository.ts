import { SearchResultModel } from '../../data/models/SearchResultModel'
import { SearchCriteria } from '../../data/models/SearchCriteria'
import { PaginatedResponse } from '@packages/common'

interface SearchResultsRepository {
  searchResults(
    searchCriteria: SearchCriteria
  ): Promise<PaginatedResponse<SearchResultModel>>
}

export default SearchResultsRepository
