import {
  UIState,
  PetModel,
  useI18n,
  useInjection,
  PaginationModel,
  ShowToast,
} from '@packages/common'
import { useState, useEffect } from 'react'
import { GetMyPetsUseCase } from '../../domain/usecases/GetMyPetsUseCase'
import { DeletePetUseCase } from '../../domain/usecases/DeletePetUseCase'
import { $ } from '../../domain/di/Types'

type PetsState = {
  pets: PetModel[]
  pagination: PaginationModel
  loadingMore: boolean
  petDeleted: boolean
} & UIState

type PetsViewModel = {
  state: PetsState
  loadPets: ({ reset }: { reset: boolean }) => Promise<void>
  refreshPets: () => Promise<void>
  onReachedBottom: () => void
  deletePet: (petId: string) => Promise<void>
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
  petDeleted: false,
}

const usePetsViewModel = (): PetsViewModel => {
  const [state, setState] = useState<PetsState>(initialState)
  const { t } = useI18n()
  const getMyPetsUseCase = useInjection<GetMyPetsUseCase>($.GetMyPetsUseCase)
  const deletePetUseCase = useInjection<DeletePetUseCase>($.DeletePetUseCase)

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

  const deletePet = async (petId: string): Promise<void> => {
    try {
      setState((previous) => ({ ...previous, loading: true, error: null }))
      await deletePetUseCase.execute(petId)
      setState((previous) => ({ ...previous, loading: false, petDeleted: true }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error:
          error instanceof Error ? error.message : 'Error al eliminar mascota',
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: error instanceof Error ? error.message : 'Error al eliminar mascota',
      })
    }
  }

  return {
    state,
    loadPets,
    refreshPets,
    onReachedBottom,
    deletePet,
  }
}

export { usePetsViewModel }
export type { PetsViewModel, PetsState }
