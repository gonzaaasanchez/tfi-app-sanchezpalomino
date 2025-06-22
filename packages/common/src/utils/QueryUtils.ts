/**
 * Utility functions for building query parameters
 */

export interface PaginationParams {
  page?: number
  limit?: number
}

/**
 * Builds a query string from pagination parameters
 * @param params - Pagination parameters (page and limit)
 * @returns Query string (e.g., "page=1&limit=10" or empty string if no params)
 */
export function buildPaginationQueryString(params: PaginationParams): string {
  const urlParams = new URLSearchParams()
  
  if (params.page !== undefined) {
    urlParams.append('page', params.page.toString())
  }
  
  if (params.limit !== undefined) {
    urlParams.append('limit', params.limit.toString())
  }
  
  return urlParams.toString()
}

/**
 * Builds a complete URL with pagination query parameters
 * @param baseUrl - The base URL without query parameters
 * @param params - Pagination parameters
 * @returns Complete URL with query parameters
 */
export function buildPaginatedUrl(baseUrl: string, params: PaginationParams): string {
  const queryString = buildPaginationQueryString(params)
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
} 