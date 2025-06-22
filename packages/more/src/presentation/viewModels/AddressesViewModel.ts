import { UIState, Address, useI18n } from '@packages/common'
import { useState } from 'react'

type AddressesViewModel = {
  state: AddressesState
  loadAddresses: () => Promise<void>
}

type AddressesState = {
  addresses: Address[]
} & UIState

const initialState: AddressesState = {
  loading: false,
  error: null,
  addresses: [],
}

const useAddressesViewModel = (): AddressesViewModel => {
  const { t } = useI18n()
  const [state, setState] = useState<AddressesState>(initialState)

  const loadAddresses = async (): Promise<void> => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      // Aquí se implementaría la lógica para cargar las direcciones
      // Por ahora solo simulamos la carga
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setState((previous) => ({
        ...previous,
        loading: false,
        addresses: [], // Aquí se cargarían las direcciones reales
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: 'Error al cargar las direcciones',
      }))
    }
  }

  return {
    state,
    loadAddresses,
  }
}

export { useAddressesViewModel }
