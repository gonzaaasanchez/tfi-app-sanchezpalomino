import { UIState, useInjection, useI18n, ShowToast } from '@packages/common'
import { useEffect, useState } from 'react'
import {
  ReservationModel,
  ReserveStatus,
} from '../../data/models/ReservationModel'
import { AcceptReservationUseCase } from '../../domain/usecases/AcceptReservationUseCase'
import { RejectReservationUseCase } from '../../domain/usecases/RejectReservationUseCase'
import { CancelReservationUseCase } from '../../domain/usecases/CancelReservationUseCase'
import { GetReservationReviewsUseCase } from '../../domain/usecases/GetReservationReviewsUseCase'
import { SaveReviewUseCase } from '../../domain/usecases/SaveReviewUseCase'
import { $ } from '../../domain/di/Types'
import {
  ReservationReviewModel,
  ReviewModel,
} from '../../data/models/ReviewModel'

type ReserveDetailViewModel = {
  state: ReserveDetailState
  acceptReserve: () => void
  rejectReserve: () => void
  cancelReserveCarer: () => void
  cancelReserveOwner: () => void
  clearConfirmation: () => void
  executeAction: () => Promise<void>
  clearStatusMessage: () => void
  loadReservationReviews: () => Promise<void>
  saveReview: (rating: number, comment: string) => Promise<void>
}

type ReserveDetailState = {
  currentReserve: ReservationModel
  currentReserveReview: ReservationReviewModel | null
  reserveStatusChangeTitle: string | undefined
  reserveStatusChangeSubtitle: string | undefined
  reviewSent: boolean
  confirmationDialog: {
    show: boolean
    action: () => Promise<void>
    title: string
    subtitle: string
  } | null
} & UIState

const useReserveDetailViewModel = (
  reservation: ReservationModel
): ReserveDetailViewModel => {
  const [state, setState] = useState<ReserveDetailState>({
    loading: false,
    error: null,
    currentReserve: reservation,
    currentReserveReview: null,
    reserveStatusChangeTitle: undefined,
    reserveStatusChangeSubtitle: undefined,
    reviewSent: false,
    confirmationDialog: null,
  })
  const { t } = useI18n()

  const acceptReservationUseCase = useInjection<AcceptReservationUseCase>(
    $.AcceptReservationUseCase
  )
  const rejectReservationUseCase = useInjection<RejectReservationUseCase>(
    $.RejectReservationUseCase
  )
  const cancelReservationUseCase = useInjection<CancelReservationUseCase>(
    $.CancelReservationUseCase
  )
  const getReservationReviewsUseCase =
    useInjection<GetReservationReviewsUseCase>($.GetReservationReviewsUseCase)
  const saveReviewUseCase = useInjection<SaveReviewUseCase>($.SaveReviewUseCase)

  useEffect(() => {
    if (state.currentReserve.status === ReserveStatus.Finished) {
      loadReservationReviews()
    }
  }, [state.currentReserve])

  const acceptReserve = (): void => {
    setState((prev) => ({
      ...prev,
      confirmationDialog: {
        show: true,
        title: t('reserveDetailScreen.confirmation.title'),
        subtitle: t('reserveDetailScreen.confirmation.acceptSubtitle'),
        action: async () => {
          setState((prev) => ({ ...prev, loading: true, error: null }))
          try {
            await acceptReservationUseCase.execute(state.currentReserve?.id, t)
            setState((prev) => ({
              ...prev,
              loading: false,
              reserveStatusChangeTitle: t(
                'reserveDetailScreen.success.acceptedTitle'
              ),
              reserveStatusChangeSubtitle: t(
                'reserveDetailScreen.success.acceptedSubtitle'
              ),
            }))
          } catch (error) {
            setState((prev) => ({ ...prev, loading: false }))
            ShowToast({
              config: 'error',
              title: t('general.ups'),
              subtitle:
                error instanceof Error
                  ? error.message
                  : t('reserveDetailScreen.error.acceptFailed'),
            })
          }
        },
      },
    }))
  }

  const rejectReserve = (): void => {
    setState((prev) => ({
      ...prev,
      confirmationDialog: {
        show: true,
        title: t('reserveDetailScreen.confirmation.title'),
        subtitle: t('reserveDetailScreen.confirmation.rejectSubtitle'),
        action: async () => {
          setState((prev) => ({ ...prev, loading: true, error: null }))
          try {
            await rejectReservationUseCase.execute(state.currentReserve?.id, t)
            setState((prev) => ({
              ...prev,
              loading: false,
              reserveStatusChangeTitle: t(
                'reserveDetailScreen.success.rejectedTitle'
              ),
              reserveStatusChangeSubtitle: t(
                'reserveDetailScreen.success.rejectedSubtitle'
              ),
            }))
          } catch (error) {
            setState((prev) => ({ ...prev, loading: false }))
            ShowToast({
              config: 'error',
              title: t('general.ups'),
              subtitle:
                error instanceof Error
                  ? error.message
                  : t('reserveDetailScreen.error.rejectFailed'),
            })
          }
        },
      },
    }))
  }

  const cancelReserveCarer = (): void => {
    const subtitle =
      state.currentReserve?.status === ReserveStatus.WaitingAcceptance
        ? t('reserveDetailScreen.confirmation.cancelCarerPendingSubtitle')
        : t('reserveDetailScreen.confirmation.cancelCarerAcceptedSubtitle')
    setState((prev) => ({
      ...prev,
      confirmationDialog: {
        show: true,
        title: t('reserveDetailScreen.confirmation.title'),
        subtitle: subtitle,
        action: async () => {
          setState((prev) => ({ ...prev, loading: true, error: null }))
          try {
            await cancelReservationUseCase.execute(state.currentReserve?.id, t)
            setState((prev) => ({
              ...prev,
              loading: false,
              reserveStatusChangeTitle: t(
                'reserveDetailScreen.success.cancelledCarerTitle'
              ),
              reserveStatusChangeSubtitle: t(
                'reserveDetailScreen.success.cancelledCarerSubtitle'
              ),
            }))
          } catch (error) {
            setState((prev) => ({ ...prev, loading: false }))
            ShowToast({
              config: 'error',
              title: t('general.ups'),
              subtitle:
                error instanceof Error
                  ? error.message
                  : t('reserveDetailScreen.error.cancelFailed'),
            })
          }
        },
      },
    }))
  }

  const cancelReserveOwner = (): void => {
    const subtitle =
      state.currentReserve?.status === ReserveStatus.WaitingAcceptance
        ? t('reserveDetailScreen.confirmation.cancelOwnerPendingSubtitle')
        : t('reserveDetailScreen.confirmation.cancelOwnerAcceptedSubtitle')
    setState((prev) => ({
      ...prev,
      confirmationDialog: {
        show: true,
        title: t('reserveDetailScreen.confirmation.title'),
        subtitle: subtitle,
        action: async () => {
          setState((prev) => ({ ...prev, loading: true, error: null }))
          try {
            await cancelReservationUseCase.execute(state.currentReserve?.id, t)
            setState((prev) => ({
              ...prev,
              loading: false,
              reserveStatusChangeTitle: t(
                'reserveDetailScreen.success.cancelledOwnerTitle'
              ),
              reserveStatusChangeSubtitle: t(
                'reserveDetailScreen.success.cancelledOwnerSubtitle'
              ),
            }))
          } catch (error) {
            setState((prev) => ({ ...prev, loading: false }))
            ShowToast({
              config: 'error',
              title: t('general.ups'),
              subtitle:
                error instanceof Error
                  ? error.message
                  : t('reserveDetailScreen.error.cancelFailed'),
            })
          }
        },
      },
    }))
  }

  const clearConfirmation = (): void => {
    setState((prev) => ({ ...prev, confirmationDialog: null }))
  }

  const executeAction = async (): Promise<void> => {
    if (state.confirmationDialog?.action) {
      await state.confirmationDialog.action()
    }
  }

  const clearStatusMessage = (): void => {
    setState((prev) => ({
      ...prev,
      reserveStatusChangeTitle: undefined,
      reserveStatusChangeSubtitle: undefined,
    }))
  }

  const loadReservationReviews = async (): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const reviews = await getReservationReviewsUseCase.execute(
        state.currentReserve.id
      )
      setState((prev) => ({
        ...prev,
        loading: false,
        currentReserveReview: reviews,
      }))
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle:
          error instanceof Error
            ? error.message
            : t('reserveDetailScreen.error.loadReviewsFailed'),
      })
    }
  }

  const saveReview = async (rating: number, comment: string): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      await saveReviewUseCase.execute(state.currentReserve.id, rating, comment)
      setState((prev) => ({ ...prev, loading: false, reviewSent: true }))
      ShowToast({
        config: 'success',
        title: t('reserveDetailScreen.success.reviewSavedTitle'),
        subtitle: t('reserveDetailScreen.success.reviewSavedSubtitle'),
      })
      await loadReservationReviews()
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle:
          error instanceof Error
            ? error.message
            : t('reserveDetailScreen.error.saveReviewFailed'),
      })
    }
  }

  return {
    state,
    acceptReserve,
    rejectReserve,
    cancelReserveCarer,
    cancelReserveOwner,
    clearConfirmation,
    executeAction,
    clearStatusMessage,
    loadReservationReviews,
    saveReview,
  }
}

export { useReserveDetailViewModel }
