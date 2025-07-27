import {
  UIState,
  useInjection,
  usePagination,
  PaginationModel,
  LoadFunction,
  ShowToast,
  useI18n,
} from '@packages/common'
import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetFeedUseCase } from '../../domain/usecases/GetFeedUseCase'
import { LikePostUseCase } from '../../domain/usecases/LikePostUseCase'
import { $ } from '../../domain/di/Types'
import { FeedModel } from '@packages/common'
import {
  FeedAppState,
  clearPostCreated,
} from '../../domain/store/FeedSlice'

type FeedState = {
  pagination: {
    items: FeedModel[]
    pagination: PaginationModel
    loading: boolean
    loadingMore: boolean
  }
} & UIState

type FeedViewModel = {
  state: FeedState
  loadFeed: ({ reset }: { reset: boolean }) => Promise<void>
  refreshFeed: () => Promise<void>
  likePost: (post: FeedModel) => Promise<void>
}

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
  const likePostUseCase: LikePostUseCase = useInjection($.LikePostUseCase)
  const dispatch = useDispatch()
  const { t } = useI18n()

  // Listen to feed slice changes
  const lastPostCreated = useSelector(
    (state: FeedAppState) => state.feed.lastPostCreated
  )

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
        error:
          error instanceof Error ? error.message : 'Error al cargar el feed',
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

  useEffect(() => {
    loadFeed({ reset: true })
  }, [])

  useEffect(() => {
    if (lastPostCreated) {
      ShowToast({
        config: 'success',
        title: t('general.success'),
        subtitle: 'Post creado exitosamente',
      })
      refreshFeed().then(() => {
        dispatch(clearPostCreated())
      })
    }
  }, [lastPostCreated, dispatch])

  const likePost = async (post: FeedModel): Promise<void> => {
    try {
      await likePostUseCase.execute(post.id, post.hasLiked)
      await loadFeed({ reset: true })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al dar like al post'
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: errorMessage,
      })
    }
  }

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
    likePost,
  }
}

export { useFeedViewModel }
