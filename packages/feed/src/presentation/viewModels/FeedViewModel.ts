import {
  UIState,
  useInjection,
  usePagination,
  PaginationModel,
  LoadFunction,
} from '@packages/common'
import { useState, useEffect, useCallback } from 'react'
import { GetFeedUseCase } from '../../domain/usecases/GetFeedUseCase'
import { $ } from '../../domain/di/Types'
import { FeedModel } from '@packages/common'

type FeedViewModel = {
  state: FeedState
  loadFeed: ({ reset }: { reset: boolean }) => Promise<void>
  refreshFeed: () => Promise<void>
}

type FeedState = {
  pagination: {
    items: FeedModel[]
    pagination: PaginationModel
    loading: boolean
    loadingMore: boolean
  }
} & UIState

const initialState: FeedState = {
  loading: false,
  error: null,
  pagination: {
    items: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    loading: false,
    loadingMore: false,
  },
}

const useFeedViewModel = (): FeedViewModel => {
  const [state, setState] = useState<FeedState>(initialState)
  const getFeedUseCase: GetFeedUseCase = useInjection($.GetFeedUseCase)

  // Create load function for pagination hook
  const loadFeedFunction: LoadFunction<FeedModel> = useCallback(
    async (page: number, limit: number) => {
      const response = await getFeedUseCase.execute(page, limit)

      return {
        items: response.items || [],
        pagination: response.pagination,
      }
    },
    [getFeedUseCase]
  )

  const pagination = usePagination(loadFeedFunction)

  const loadFeed = async ({ reset }: { reset: boolean }): Promise<void> => {
    try {
      setState((previous) => ({
        ...previous,
        loading: true,
        error: null,
      }))

      await pagination.loadItems(reset)
    } catch (error) {
      setState((previous) => ({
        ...previous,
        error: error instanceof Error ? error.message : 'Error al cargar el feed',
      }))
    } finally {
      setState((previous) => ({
        ...previous,
        loading: false,
      }))
    }
  }

  const refreshFeed = async (): Promise<void> => {
    await loadFeed({ reset: true })
  }

  // Load feed on mount
  useEffect(() => {
    loadFeed({ reset: true })
  }, [])

  return {
    state: {
      ...state,
      pagination: {
        items: pagination.state.items,
        pagination: pagination.state.pagination,
        loading: pagination.state.loading,
        loadingMore: pagination.state.loadingMore,
      },
    },
    loadFeed,
    refreshFeed,
  }
}

export { useFeedViewModel }
