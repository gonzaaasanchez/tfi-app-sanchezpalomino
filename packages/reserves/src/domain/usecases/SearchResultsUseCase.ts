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
    searchCriteria: SearchCriteria
  ): Promise<PaginatedResponse<SearchResultModel>> {
    const response = await this.searchResultsRepository.searchResults(searchCriteria)
    
    // Convertir los objetos planos del API en instancias de clase para que funcionen los getters
    const convertedItems = response.items.map(item => ({
      ...item,
      caregiver: new UserModel(item.caregiver)
    }))

    return {
      items: convertedItems,
      pagination: response.pagination
    }
  }
}

export { SearchResultsUseCase }
