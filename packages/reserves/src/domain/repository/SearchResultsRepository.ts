import { SearchResultModel } from '../../data/models/SearchResultModel'
import { SearchCriteria } from '../../data/models/SearchCriteria'
import { PaginatedResponse } from '@packages/common'

interface SearchResultsRepository {
  searchResults(
    searchCriteria: SearchCriteria,
    page: number,
    limit: number
  ): Promise<PaginatedResponse<SearchResultModel>>
}

export default SearchResultsRepository
