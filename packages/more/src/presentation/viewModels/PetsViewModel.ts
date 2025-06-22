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
} & UIState

type PetsViewModel = {
  state: PetsState
  loadPets: () => Promise<void>
  refreshPets: () => Promise<void>
}

const initialState: PetsState = {   
  pets: [],
  pagination: null,
  loading: false,
  error: null,
}

const usePetsViewModel = (): PetsViewModel => {
  const [state, setState] = useState<PetsState>(initialState)
  const { t } = useI18n()
  const getMyPetsUseCase = useInjection<GetMyPetsUseCase>($.GetMyPetsUseCase)

  const loadPets = async (): Promise<void> => {
    try {
      setState((previous) => ({ ...previous, loading: true, error: null }))
      const response = await getMyPetsUseCase.execute()
      console.log('response', response)
      setState((previous) => ({
        ...previous,
        pets: response.items ?? [],
        pagination: response.pagination,
        loading: false,
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error:
          error instanceof Error ? error.message : 'Error al cargar mascotas',
      }))
    }
  }

  const refreshPets = async (): Promise<void> => {
    await loadPets()
  }

  useEffect(() => {
    loadPets()
  }, [])

  return {
    state,
    loadPets,
    refreshPets,
  }
}

export { usePetsViewModel }
export type { PetsViewModel, PetsState }
