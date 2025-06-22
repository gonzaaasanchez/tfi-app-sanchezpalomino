import {
  UIState,
  Address,
  useI18n,
  useInjection,
  Color,
  ShowToast,
  LabelStyle,
} from '@packages/common'
import { useState } from 'react'
import { AddAddressUseCase } from '../../domain/usecases/AddAddressUseCase'
import { $ } from '../../domain/di/Types'

type AddressNewViewModel = {
  state: AddressNewState
  setName: (name: string) => void
  setAddress: (address: Address) => void
  setFloor: (floor: string) => void
  setApartment: (apartment: string) => void
  saveAddress: () => Promise<void>
  validateForm: () => string[]
}

type AddressNewState = {
  name: string | null
  address: Address | null
  floor: string
  apartment: string
  addressSaved: boolean
} & UIState

const initialState: AddressNewState = {
  loading: false,
  error: null,
  name: null,
  address: null,
  floor: '',
  apartment: '',
  addressSaved: false,
}

const useAddressNewViewModel = (): AddressNewViewModel => {
  const { t } = useI18n()
  const addAddressUseCase = useInjection<AddAddressUseCase>($.AddAddressUseCase)
  const [state, setState] = useState<AddressNewState>(initialState)

  const setAddress = (address: Address): void => {
    setState((previous) => ({
      ...previous,
      address,
    }))
  }

  const setName = (name: string): void => {
    setState((previous) => ({
      ...previous,
      name,
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

  const validateForm = (): string[] => {
    const errors: string[] = []
    const { name, address } = state

    if (!name) {
      errors.push(t('addressNewScreen.validation.nameRequired'))
    }
    if (!address?.fullAddress) {
      errors.push(t('addressNewScreen.validation.addressRequired'))
    }
    return errors
  }

  const saveAddress = async (): Promise<void> => {
    const errors = validateForm()
    const errorMessage = errors.map((error) => `• ${error}`).join('\n')
    if (errors.length > 0) {
      setState((previous) => ({
        ...previous,
        error: errorMessage,
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: errorMessage,
        duration: 5000,
        subtitleStyle: {
          ...LabelStyle.body({
            fontWeight: 400,
            color: Color.black[600],
          }),
        },
      })
      return
    }

    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      const addressToSave: Address = {
        name: state.name || '',
        fullAddress: state.address?.fullAddress || '',
        coords: state.address?.coords || { lat: 0, lon: 0 },
        floor: state.floor || undefined,
        apartment: state.apartment || undefined,
      }

      const createdAddress = await addAddressUseCase.execute(addressToSave)

      setState((previous) => ({
        ...previous,
        loading: false,
        addressSaved: true,
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
    setName,
    setAddress,
    setFloor,
    setApartment,
    saveAddress,
    validateForm,
  }
}

export { useAddressNewViewModel }
