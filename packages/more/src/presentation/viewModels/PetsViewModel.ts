import {
  UIState,
  PetModel,
  useI18n,
  useInjection,
  PaginationModel,
  ShowToast,
  usePagination,
  LoadFunction,
} from '@packages/common'
import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetMyPetsUseCase } from '../../domain/usecases/GetMyPetsUseCase'
import { DeletePetUseCase } from '../../domain/usecases/DeletePetUseCase'
import { $ } from '../../domain/di/Types'
import {
  MoreAppState,
  clearPetChange,
  markPetChange,
} from '../../domain/store/MoreSlice'

type PetsState = {
  petUpdated: boolean
  pagination: {
    items: PetModel[]
    pagination: PaginationModel
    loading: boolean
    loadingMore: boolean
  }
} & UIState

type PetsViewModel = {
  state: PetsState
  loadPets: ({ reset }: { reset: boolean }) => Promise<void>
  deletePet: (petId: string) => Promise<void>
}

const initialState: PetsState = {
  loading: false,
  error: null,
  petUpdated: false,
  pagination: {
    items: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    loading: false,
    loadingMore: false,
  },
}

const usePetsViewModel = (): PetsViewModel => {
  const [state, setState] = useState<PetsState>(initialState)
  const { t } = useI18n()
  const dispatch = useDispatch()
  const getMyPetsUseCase = useInjection<GetMyPetsUseCase>($.GetMyPetsUseCase)
  const deletePetUseCase = useInjection<DeletePetUseCase>($.DeletePetUseCase)

  // Listen to more slice changes
  const lastPetChange = useSelector(
    (state: MoreAppState) => state.more.lastPetChange
  )

  // Create load function for pagination hook
  const loadPetsFunction: LoadFunction<PetModel> = useCallback(
    async (page: number, limit: number) => {
      const response = await getMyPetsUseCase.execute(page, limit)

      return {
        items: response.items || [],
        pagination: response.pagination,
      }
    },
    [getMyPetsUseCase]
  )

  const pagination = usePagination(loadPetsFunction)

  useEffect(() => {
    loadPets({ reset: true })
  }, [])

  // Refresh pets when any pet change occurs
  useEffect(() => {
    if (lastPetChange) {
      loadPets({ reset: true }).then(() => {
        dispatch(clearPetChange())
      })
    }
  }, [lastPetChange, dispatch])

  const loadPets = async ({ reset }: { reset: boolean }): Promise<void> => {
    try {
      await pagination.loadItems(reset)
    } catch (error) {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle:
          error instanceof Error ? error.message : 'Error al cargar mascotas',
      })
    }
  }

  const deletePet = async (petId: string): Promise<void> => {
    try {
      setState((previous) => ({ ...previous, loading: true, error: null }))
      await deletePetUseCase.execute(petId)
      setState((previous) => ({
        ...previous,
        petUpdated: true,
        loading: false,
      }))

      dispatch(markPetChange())
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
        subtitle:
          error instanceof Error ? error.message : 'Error al eliminar mascota',
      })
    }
  }

  return {
    state: {
      ...state,
      loading: state.loading,
      pagination: {
        items: pagination.state.items,
        pagination: pagination.state.pagination,
        loading: pagination.state.loading,
        loadingMore: pagination.state.loadingMore,
      },
    },
    loadPets,
    deletePet,
  }
}

export { usePetsViewModel }
export type { PetsViewModel, PetsState }
