import { HttpClient, PaginatedResponse, DateUtils } from '@packages/common'
import { SearchResultModel } from '../../models/SearchResultModel'
import {
  SearchCriteria,
  SortField,
  SortOrder,
} from '../../models/SearchCriteria'
import { PlaceType } from '../../models/ReservationModel'
import { BaseResponse } from '@packages/common/src/data/http/BaseResponse'

export interface SearchResultsApi {
  getSearchResults(
    searchCriteria: SearchCriteria
  ): Promise<PaginatedResponse<SearchResultModel>>
}

export class SearchResultsApiImpl implements SearchResultsApi {
  constructor(private readonly httpClient: HttpClient) {}

  async getSearchResults(
    searchCriteria: SearchCriteria
  ): Promise<PaginatedResponse<SearchResultModel>> {
    const requestBody: any = {
      startDate: DateUtils.YYYYMMDD(searchCriteria.fromDate),
      endDate: DateUtils.YYYYMMDD(searchCriteria.toDate),
      careLocation: searchCriteria.placeType.toString(),
      ...(searchCriteria.placeType === PlaceType.OwnerHome && {
        userAddressId: searchCriteria.selectedAddress?._id,
      }),
      petIds: searchCriteria.selectedPets.map((pet) => pet.id || ''),
      maxDistance: searchCriteria.maxDistance,
      maxPrice: searchCriteria.maxPrice,
      visitsPerDay: searchCriteria.visits,
    }

    const response = await this.httpClient.post<
      BaseResponse<PaginatedResponse<SearchResultModel>>
    >('/caregiver-search', requestBody)

    const apiData =
      response.data as unknown as PaginatedResponse<SearchResultModel> & {
        searchParams: any
      }

    // Extraer solo los campos que necesita PaginatedResponse
    return {
      items: apiData.items,
      pagination: apiData.pagination,
    }
  }
}
