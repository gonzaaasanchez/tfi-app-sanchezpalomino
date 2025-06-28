import { useState, useCallback } from 'react'
import { PaginationModel } from '../data/models/PaginationModel'

export type PaginationState<T> = {
  items: T[]
  pagination: PaginationModel
  loading: boolean
  loadingMore: boolean
  error: string | null
}

export type PaginationConfig = {
  initialPage?: number
  limit?: number
  threshold?: number // pixels from bottom to trigger load
}

export type LoadFunction<T> = (
  page: number,
  limit: number
) => Promise<{
  items: T[]
  pagination: PaginationModel
}>

export const usePagination = <T>(
  loadFunction: LoadFunction<T>,
  config: PaginationConfig = {}
) => {
  const { initialPage = 1, limit = 10, threshold = 20 } = config

  const [state, setState] = useState<PaginationState<T>>({
    items: [],
    pagination: {
      page: initialPage,
      limit,
      total: 0,
      totalPages: 0,
    },
    loading: false,
    loadingMore: false,
    error: null,
  })

  const loadItems = useCallback(
    async (reset: boolean = true) => {
      try {
        if (state.loading || state.loadingMore) return

        if (reset) {
          setState((prev) => ({
            ...prev,
            loading: true,
            loadingMore: false,
            error: null,
            pagination: {
              ...prev.pagination,
              page: initialPage, // Reset to initial page
            },
          }))

          const response = await loadFunction(
            initialPage,
            state.pagination.limit
          )

          setState((prev) => ({
            ...prev,
            items: response.items || [],
            pagination: response.pagination || {
              ...prev.pagination,
              page: initialPage,
            },
            loading: false,
            loadingMore: false,
          }))
        } else {
          const hasMorePages =
            state.pagination.page < state.pagination.totalPages
          if (!hasMorePages) return

          setState((prev) => ({
            ...prev,
            loading: false,
            loadingMore: true,
          }))
          const nextPage = state.pagination.page + 1

          const response = await loadFunction(nextPage, state.pagination.limit)

          setState((prev) => ({
            ...prev,
            items: [...prev.items, ...(response.items || [])],
            pagination: response.pagination || prev.pagination,
            loading: false,
            loadingMore: false,
          }))
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Error al cargar datos'
        setState((prev) => ({
          ...prev,
          loading: false,
          loadingMore: false,
          error: errorMessage,
        }))
        throw error
      }
    },
    [
      loadFunction,
      state.pagination,
      state.loading,
      state.loadingMore,
      initialPage,
    ]
  )

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }))
  }, [])

  const handleScroll = useCallback(
    (event: any) => {
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent
      const isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - threshold

      const hasMorePages = state.pagination.page < state.pagination.totalPages

      if (isCloseToBottom && hasMorePages && !state.loadingMore) {
        return true // signal to load more
      }
      return false
    },
    [state.pagination, state.loadingMore, threshold]
  )

  return {
    state,
    loadItems,
    setError,
    handleScroll,
  }
}
