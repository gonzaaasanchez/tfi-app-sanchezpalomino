import {
  UIState,
  AddressModel,
  useI18n,
  useInjection,
  ShowToast,
} from '@packages/common'
import { useState, useEffect } from 'react'
import { GetAddressesUseCase } from '../../domain/usecases/GetAddressesUseCase'
import { $ } from '../../domain/di/Types'

type AddressesViewModel = {
  state: AddressesState
  loadAddresses: () => Promise<void>
}

type AddressesState = {
  addresses: AddressModel[]
  addressDeleted: boolean
} & UIState

const initialState: AddressesState = {
  loading: false,
  error: null,
  addresses: [],
  addressDeleted: false,
}

const useAddressesViewModel = (): AddressesViewModel => {
  const { t } = useI18n()
  const [state, setState] = useState<AddressesState>(initialState)
  const getAddressesUseCase: GetAddressesUseCase = useInjection(
    $.GetAddressesUseCase
  )

  const loadAddresses = async (): Promise<void> => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      const addresses = await getAddressesUseCase.execute()

      setState((previous) => ({
        ...previous,
        loading: false,
        addresses,
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: t('addressesScreen.error.loadAddresses'),
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: t('addressesScreen.error.loadAddresses'),
      })
    }
  }

  useEffect(() => {
    loadAddresses()
  }, [])

  return {
    state,
    loadAddresses,
  }
}

export { useAddressesViewModel }
