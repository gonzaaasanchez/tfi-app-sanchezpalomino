import {
  UIState,
  useInjection,
  usePagination,
  PaginationModel,
  LoadFunction,
  useI18n,
  ShowToast,
  Types,
} from '@packages/common'
import { useState, useEffect, useCallback } from 'react'
import { GetFeedCommentsUseCase } from '../../domain/usecases/GetFeedCommentsUseCase'
import { CreateCommentUseCase } from '../../domain/usecases/CreateCommentUseCase'
import { $ } from '../../domain/di/Types'
import { CommentModel } from '@packages/common'

type FeedCommentsState = {
  postId: string
  commentText: string
  pagination: {
    items: CommentModel[]
    pagination: PaginationModel
    loading: boolean
    loadingMore: boolean
  }
} & UIState

type FeedCommentsViewModel = {
  state: FeedCommentsState
  baseUrl: string
  loadComments: ({ reset }: { reset: boolean }) => Promise<void>
  setCommentText: (text: string) => void
  createComment: () => Promise<void>
}

const useFeedCommentsViewModel = (postId: string): FeedCommentsViewModel => {
  const [state, setState] = useState<FeedCommentsState>({
    loading: false,
    error: null,
    postId,
    commentText: '',
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
  })

  const getFeedCommentsUseCase: GetFeedCommentsUseCase = useInjection(
    $.GetFeedCommentsUseCase
  )
  const createCommentUseCase: CreateCommentUseCase = useInjection(
    $.CreateCommentUseCase
  )
  const { t } = useI18n()
  const baseUrl = useInjection(Types.BaseURL) as string

  // Create load function for pagination hook
  const loadCommentsFunction: LoadFunction<CommentModel> = useCallback(
    async (page: number, limit: number) => {
      const response = await getFeedCommentsUseCase.execute(postId, page, limit)

      return {
        items: response.items || [],
        pagination: response.pagination,
      }
    },
    [getFeedCommentsUseCase, postId]
  )

  const pagination = usePagination(loadCommentsFunction)

  const loadComments = async ({ reset }: { reset: boolean }): Promise<void> => {
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
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle:
          error instanceof Error
            ? error.message
            : 'Error al cargar los comentarios',
      })
    } finally {
      setState((previous) => ({
        ...previous,
        loading: false,
      }))
    }
  }

  useEffect(() => {
    loadComments({ reset: true })
  }, [postId])

  const setCommentText = (text: string): void => {
    setState((previous) => ({
      ...previous,
      commentText: text,
    }))
  }

  const createComment = async (): Promise<void> => {
    if (!state.commentText.trim()) return

    try {
      setState((previous) => ({
        ...previous,
        loading: true,
        error: null,
      }))

      await createCommentUseCase.execute(postId, state.commentText.trim())

      setState((previous) => ({
        ...previous,
        commentText: '',
      }))

      await loadComments({ reset: true })
    } catch (error) {
      setState((previous) => ({
        ...previous,
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle:
          error instanceof Error
            ? error.message
            : 'Error al crear el comentario',
      })
    } finally {
      setState((previous) => ({
        ...previous,
        loading: false,
      }))
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
    baseUrl,
    loadComments,
    createComment,
    setCommentText,
  }
}

export { useFeedCommentsViewModel }
