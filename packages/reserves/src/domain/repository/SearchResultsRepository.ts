import { SearchResultModel } from '../../data/models/SearchResultModel'
import { SearchCriteria } from '../../data/models/SearchCriteria'

interface SearchResultsRepository {
  searchResults(searchCriteria: SearchCriteria): Promise<SearchResultModel[]>
}

export default SearchResultsRepository 