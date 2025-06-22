import { UIState, Address, useI18n, ShowToast } from '@packages/common'
import { useState } from 'react'

type AddressNewViewModel = {
  state: AddressNewState
  setAddress: (address: Address) => void
  setFloor: (floor: string) => void
  setApartment: (apartment: string) => void
  saveAddress: () => Promise<void>
  validateForm: () => [boolean, string?]
}

type AddressNewState = {
  address: Address | null
  floor: string
  apartment: string
} & UIState

const initialState: AddressNewState = {
  loading: false,
  error: null,
  address: null,
  floor: '',
  apartment: '',
}

const useAddressNewViewModel = (): AddressNewViewModel => {
  const { t } = useI18n()
  const [state, setState] = useState<AddressNewState>(initialState)

  const setAddress = (address: Address): void => {
    setState((previous) => ({
      ...previous,
      address,
    }))
  }

  const setFloor = (floor: string): void => {
    setState((previous) => ({
      ...previous,
      floor,
    }))
  }

  const setApartment = (apartment: string): void => {
    setState((previous) => ({
      ...previous,
      apartment,
    }))
  }

  const validateForm = (): [boolean, string?] => {
    if (!state.address?.fullAddress) {
      return [false, t('addressNewScreen.validation.addressRequired')]
    }
    return [true]
  }

  const saveAddress = async (): Promise<void> => {
    const [isValid, error] = validateForm()
    if (!isValid) {
      setState((previous) => ({
        ...previous,
        error,
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: error,
      })
      return
    }

    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      // Aquí se implementaría la lógica para guardar la dirección
      // Por ahora solo simulamos el guardado
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setState((previous) => ({
        ...previous,
        loading: false,
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: 'Error al guardar la dirección',
      }))
    }
  }

  return {
    state,
    setAddress,
    setFloor,
    setApartment,
    saveAddress,
    validateForm,
  }
}

export { useAddressNewViewModel } 