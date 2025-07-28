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
import { FeedAppState, clearPostCreated } from '../../domain/store/FeedSlice'

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
  const [serverLikes, setServerLikes] = useState<
    Map<string, { hasLiked: boolean; likesCount: number }>
  >(new Map())
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
    // Clear optimistic state when refreshing
    setServerLikes(new Map())
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

  // Function to get the final state of a post with server data
  const getPostWithServerLikes = useCallback(
    (post: FeedModel): FeedModel => {
      const serverLikeData = serverLikes.get(post.id)

      if (serverLikeData) {
        return {
          ...post,
          hasLiked: serverLikeData.hasLiked,
          likesCount: serverLikeData.likesCount,
        }
      }

      return post
    },
    [serverLikes]
  )

  const likePost = async (post: FeedModel): Promise<void> => {
    try {
      // Calculate new optimistic state
      const newHasLiked = !post.hasLiked
      const newLikesCount = newHasLiked
        ? post.likesCount + 1
        : Math.max(post.likesCount - 1, 0)

      // Update optimistic state immediately
      setServerLikes(
        (prev) =>
          new Map(
            prev.set(post.id, {
              hasLiked: newHasLiked,
              likesCount: newLikesCount,
            })
          )
      )

      // Call the service
      await likePostUseCase.execute(post.id, post.hasLiked)

      // The service doesn't return the updated post, so we keep the optimistic state
      // that we calculated correctly
    } catch (error) {
      // If it fails, revert the optimistic state
      setServerLikes((prev) => {
        const newMap = new Map(prev)
        newMap.delete(post.id)
        return newMap
      })

      const errorMessage =
        error instanceof Error ? error.message : 'Error al dar like al post'
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
        items: pagination.state.items.map(getPostWithServerLikes),
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
