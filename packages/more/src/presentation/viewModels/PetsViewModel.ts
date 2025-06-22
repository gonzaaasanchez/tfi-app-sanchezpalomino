import {
  UIState,
  PetModel,
  useI18n,
  useInjection,
  PaginationModel,
} from '@packages/common'
import { useState, useEffect } from 'react'
import { GetMyPetsUseCase } from '../../domain/usecases/GetMyPetsUseCase'
import { $ } from '../../domain/di/Types'

type PetsState = {
  pets: PetModel[]
  pagination: PaginationModel
  loadingMore: boolean
} & UIState

type PetsViewModel = {
  state: PetsState
  loadPets: ({ reset }: { reset: boolean }) => Promise<void>
  refreshPets: () => Promise<void>
  onReachedBottom: () => void
}

const initialState: PetsState = {
  pets: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  loadingMore: false,
  error: null,
}

const usePetsViewModel = (): PetsViewModel => {
  const [state, setState] = useState<PetsState>(initialState)
  const { t } = useI18n()
  const getMyPetsUseCase = useInjection<GetMyPetsUseCase>($.GetMyPetsUseCase)

  useEffect(() => {
    loadPets({ reset: true })
  }, [])

  const loadPets = async ({ reset }: { reset: boolean }): Promise<void> => {
    try {
      if (state.loading || state.loadingMore) return

      if (reset) {
        if (state.loading) return
        setState((previous) => ({ ...previous, loading: true, error: null }))
        const response = await getMyPetsUseCase.execute(
          1,
          state.pagination.limit
        )
        setState((previous) => ({
          ...previous,
          pets: response.items ?? [],
          pagination: response.pagination,
          loading: false,
        }))
      } else {
        if (
          !state.pagination ||
          state.pagination.page >= state.pagination.totalPages
        )
          return

        setState((previous) => ({ ...previous, loadingMore: true }))
        const nextPage = state.pagination.page + 1
        const response = await getMyPetsUseCase.execute(
          nextPage,
          state.pagination.limit
        )

        setState((previous) => ({
          ...previous,
          pets: [...previous.pets, ...(response.items ?? [])],
          pagination: response.pagination,
          loadingMore: false,
        }))
      }
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        loadingMore: false,
        error:
          error instanceof Error ? error.message : 'Error al cargar mascotas',
      }))
    }
  }

  const refreshPets = async (): Promise<void> => {
    await loadPets({ reset: true })
  }

  const onReachedBottom = (): void => {
    loadPets({ reset: false })
  }

  return {
    state,
    loadPets,
    refreshPets,
    onReachedBottom,
  }
}

export { usePetsViewModel }
export type { PetsViewModel, PetsState }
