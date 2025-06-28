import {
  UIState,
  PetModel,
  useInjection,
  AddressModel,
  useI18n,
  ShowToast,
  DateUtils,
} from '@packages/common'
import { useState, useEffect } from 'react'
import { PlaceType } from '../../data/models/ReservationModel'
import { StackActions, useNavigation } from '@react-navigation/native'
import {
  SearchCriteria,
  SortField,
  SortOrder,
} from '../../data/models/SearchCriteria'
import { GetMyPetsUseCase } from '@packages/more/src/domain/usecases/GetMyPetsUseCase'
import { GetAddressesUseCase } from '@packages/more/src/domain/usecases/GetAddressesUseCase'
import { $ } from '@packages/more/src/domain/di/Types'

type ReserveNewViewModel = {
  state: ReserveNewState
  setFromDate: (date: Date) => void
  setToDate: (date: Date) => void
  setPlaceType: (placeType: PlaceType) => void
  setReviewsFrom: (reviewsFrom: number) => void
  setMaxDistance: (maxDistance: number) => void
  setMaxPrice: (maxPrice: number) => void
  setVisitsPerDay: (visits: number) => void
  setSelectedPets: (pets: PetModel[]) => void
  setSelectedAddress: (address: AddressModel | null) => void
  searchResults: () => Promise<void>
}

type ReserveNewState = {
  searchCriteria: SearchCriteria
} & UIState

const initialSearchCriteria: SearchCriteria = {
  fromDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  toDate: new Date(new Date().setDate(new Date().getDate() + 2)),
  placeType: PlaceType.OwnerHome,
  reviewsFrom: 1,
  maxDistance: 5,
  maxPrice: 50000,
  visits: 1,
  selectedPets: [],
  userPets: [],
  userAddresses: [],
  selectedAddress: null,
  sortBy: {
    field: SortField.PRICE,
    order: SortOrder.ASC,
  },
}

const initialState: ReserveNewState = {
  loading: false,
  error: null,
  searchCriteria: initialSearchCriteria,
}

const useReserveNewViewModel = (): ReserveNewViewModel => {
  const [state, setState] = useState<ReserveNewState>(initialState)
  const navigation = useNavigation()
  const { t } = useI18n()
  const getMyPetsUseCase = useInjection<GetMyPetsUseCase>($.GetMyPetsUseCase)
  const getAddressesUseCase = useInjection<GetAddressesUseCase>(
    $.GetAddressesUseCase
  )

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    setState((previous) => ({ ...previous, loading: true, error: null }))
    try {
      const [petsResponse, addressesResponse] = await Promise.all([
        getMyPetsUseCase.execute(1, 100),
        getAddressesUseCase.execute(),
      ])

      setState((previous) => ({
        ...previous,
        searchCriteria: {
          ...previous.searchCriteria,
          userPets: petsResponse.items || [],
          userAddresses: addressesResponse || [],
        },
        loading: false,
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : t('reserveNewScreen.validation.errorLoadingUserData'),
      }))
    }
  }

  const validateData: () => [boolean, string?] = () => {
    const { searchCriteria } = state

    if (
      DateUtils.YYYYMMDD(searchCriteria.fromDate) >
      DateUtils.YYYYMMDD(searchCriteria.toDate)
    ) {
      return [false, t('reserveNewScreen.validation.startDateAfterEndDate')]
    }
    if (searchCriteria.reviewsFrom < 1) {
      return [false, t('reserveNewScreen.validation.reviewsFromMin')]
    }
    if (searchCriteria.maxDistance <= 0) {
      return [false, t('reserveNewScreen.validation.maxDistanceMin')]
    }
    if (searchCriteria.maxPrice <= 0) {
      return [false, t('reserveNewScreen.validation.maxPriceMin')]
    }
    if (searchCriteria.visits < 1) {
      return [false, t('reserveNewScreen.validation.visitsPerDayMin')]
    }
    if (searchCriteria.selectedPets.length === 0) {
      return [false, t('reserveNewScreen.validation.petsRequired')]
    }
    if (!searchCriteria.selectedAddress) {
      return [false, t('reserveNewScreen.validation.addressRequired')]
    }
    return [true]
  }

  const searchResults = async (): Promise<void> => {
    const [isValid, error] = validateData()
    if (!isValid) {
      setState((previous: ReserveNewState) => ({
        ...previous,
        error: error,
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: error,
      })
      return
    }

    const searchCriteriaWithStringDates = {
      ...state.searchCriteria,
      fromDate: state.searchCriteria.fromDate.toISOString(),
      toDate: state.searchCriteria.toDate.toISOString(),
    }

    navigation.dispatch(
      StackActions.push('reservationResults', {
        searchCriteria: searchCriteriaWithStringDates,
      })
    )
  }

  const setFromDate = (date: Date): void => {
    setState((previous) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, fromDate: date },
    }))
  }

  const setToDate = (date: Date): void => {
    setState((previous) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, toDate: date },
    }))
  }

  const setPlaceType = (placeType: PlaceType) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: {
        ...previous.searchCriteria,
        placeType,
        selectedAddress:
          placeType === PlaceType.CarerHome
            ? null
            : previous.searchCriteria.selectedAddress,
      },
    }))
  }

  const setReviewsFrom = (reviewsFrom: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, reviewsFrom },
    }))
  }

  const setMaxDistance = (maxDistance: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, maxDistance },
    }))
  }

  const setMaxPrice = (maxPrice: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, maxPrice },
    }))
  }

  const setVisitsPerDay = (visits: number) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, visits },
    }))
  }

  const setSelectedPets = (pets: PetModel[]) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, selectedPets: pets },
    }))
  }

  const setSelectedAddress = (address: AddressModel | null) => {
    setState((previous: ReserveNewState) => ({
      ...previous,
      searchCriteria: { ...previous.searchCriteria, selectedAddress: address },
    }))
  }

  return {
    state,
    setFromDate,
    setToDate,
    setPlaceType,
    setReviewsFrom,
    setMaxDistance,
    setMaxPrice,
    setVisitsPerDay,
    setSelectedPets,
    setSelectedAddress,
    searchResults,
  }
}

export { useReserveNewViewModel }
