import { HttpClient, PaginatedResponse, DateUtils } from '@packages/common'
import { SearchResultModel } from '../../models/SearchResultModel'
import { SearchCriteria } from '../../models/SearchCriteria'
import { BaseResponse } from '@packages/common/src/data/http/BaseResponse'

export interface SearchResultsApi {
  getSearchResults(
    searchCriteria: SearchCriteria,
    page: number,
    limit: number
  ): Promise<PaginatedResponse<SearchResultModel>>
}

export class SearchResultsApiImpl implements SearchResultsApi {
  constructor(private readonly httpClient: HttpClient) {}

  async getSearchResults(
    searchCriteria: SearchCriteria,
    page: number,
    limit: number
  ): Promise<PaginatedResponse<SearchResultModel>> {
    const requestBody: any = {
      startDate: DateUtils.YYYYMMDD(searchCriteria.fromDate),
      endDate: DateUtils.YYYYMMDD(searchCriteria.toDate),
      careLocation: searchCriteria.placeType.toString(),
      userAddressId: searchCriteria.selectedAddress?._id,
      petIds: searchCriteria.selectedPets.map((pet) => pet.id || ''),
      maxDistance: searchCriteria.maxDistance,
      maxPrice: searchCriteria.maxPrice,
      visitsPerDay: searchCriteria.visits,
    }

    const queryParams = new URLSearchParams({
      sortBy: searchCriteria.sortBy.field,
      sortOrder: searchCriteria.sortBy.order,
      page: page.toString(),
      limit: limit.toString(),
    })

    const url = `/caregiver-search?${queryParams.toString()}`

    const response = await this.httpClient.post<
      BaseResponse<PaginatedResponse<SearchResultModel>>
    >(url, requestBody)

    const apiData =
      response.data as unknown as PaginatedResponse<SearchResultModel> & {
        searchParams: any
      }

    // extract only the fields that PaginatedResponse needs
    return {
      items: apiData.items,
      pagination: apiData.pagination,
    }
  }
}
