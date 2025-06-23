import {
  UIState,
  useI18n,
  ShowToast,
  Color,
  LabelStyle,
  useInjection,
  setUser,
  CarerConfig,
  AppState,
  PetType,
} from '@packages/common'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { $ } from '../../domain/di/Types'
import { UpdateCarerConfigUseCase } from '../../domain/usecases/UpdateCarerConfigUseCase'
import { GetPetTypesUseCase } from '../../domain/usecases/GetPetTypesUseCase'
import React from 'react'

type CarerPreferencesState = {
  homeCareEnabled: boolean
  homeCareDailyPrice: string
  petHomeCareEnabled: boolean
  petHomeCareVisitPrice: string
  petTypesDatasource: PetType[]
  selectedPetTypes: PetType[]
  preferencesSaved: boolean
} & UIState

type CarerPreferencesViewModel = {
  state: CarerPreferencesState
  setHomeCareEnabled: () => void
  setHomeCareDailyPrice: (price: string) => void
  setPetHomeCareEnabled: () => void
  setPetHomeCareVisitPrice: (price: string) => void
  setSelectedPetTypes: (petTypes: PetType[]) => void
  validateForm: (onValidated: () => void) => void
  savePreferences: () => void
}

const initialState: CarerPreferencesState = {
  homeCareEnabled: false,
  homeCareDailyPrice: '',
  petHomeCareEnabled: false,
  petHomeCareVisitPrice: '',
  petTypesDatasource: [],
  selectedPetTypes: [],
  loading: false,
  error: null,
  preferencesSaved: false,
}

const useCarerPreferencesViewModel = (): CarerPreferencesViewModel => {
  const [state, setState] = useState<CarerPreferencesState>(initialState)
  const { t } = useI18n()
  const dispatch = useDispatch()
  const currentUser = useSelector((state: AppState) => state.app.user)
  const updateCarerConfigUseCase: UpdateCarerConfigUseCase = useInjection(
    $.UpdateCarerConfigUseCase
  )
  const getPetTypesUseCase: GetPetTypesUseCase = useInjection(
    $.GetPetTypesUseCase
  )

  useEffect(() => {
    loadPetTypes()
  }, [])

  // Initialize state with user's current preferences
  React.useEffect(() => {
    if (currentUser?.carerConfig) {
      setState((previous) => ({
        ...previous,
        homeCareEnabled: currentUser.carerConfig.homeCare.enabled,
        homeCareDailyPrice:
          currentUser.carerConfig.homeCare.dayPrice?.toString() || '',
        petHomeCareEnabled: currentUser.carerConfig.petHomeCare.enabled,
        petHomeCareVisitPrice:
          currentUser.carerConfig.petHomeCare.visitPrice?.toString() || '',
        selectedPetTypes: currentUser.carerConfig.petTypes || [],
      }))
    }
  }, [currentUser])

  const loadPetTypes = async (): Promise<void> => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      const response = await getPetTypesUseCase.execute()
      setState((previous) => ({
        ...previous,
        loading: false,
        petTypesDatasource: response.items || [],
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: error instanceof Error ? error.message : 'Error saving pet',
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: error instanceof Error ? error.message : 'Error saving pet',
      })
    }
  }

  const setHomeCareEnabled = (): void => {
    setState((previous) => ({
      ...previous,
      homeCareEnabled: !previous.homeCareEnabled,
      // Clear price when disabled
      homeCareDailyPrice: !previous.homeCareEnabled
        ? previous.homeCareDailyPrice
        : '',
    }))
  }

  const setHomeCareDailyPrice = (price: string): void => {
    setState((previous) => ({
      ...previous,
      homeCareDailyPrice: price,
    }))
  }

  const setPetHomeCareEnabled = (): void => {
    setState((previous) => ({
      ...previous,
      petHomeCareEnabled: !previous.petHomeCareEnabled,
      // Clear price when disabled
      petHomeCareVisitPrice: !previous.petHomeCareEnabled
        ? previous.petHomeCareVisitPrice
        : '',
    }))
  }

  const setPetHomeCareVisitPrice = (price: string): void => {
    setState((previous) => ({
      ...previous,
      petHomeCareVisitPrice: price,
    }))
  }

  const setSelectedPetTypes = (petTypes: PetType[]): void => {
    setState((previous) => ({
      ...previous,
      selectedPetTypes: petTypes,
    }))
  }

  const validateForm = (onValidated: () => void): void => {
    const errors = getValidationErrors()

    if (errors.length === 0) {
      onValidated()
    } else {
      const errorMessage = errors.map((error) => `• ${error}`).join('\n')
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
    }
  }

  const getValidationErrors = (): string[] => {
    const errors: string[] = []
    const {
      homeCareEnabled,
      homeCareDailyPrice,
      petHomeCareEnabled,
      petHomeCareVisitPrice,
    } = state

    // Validate home care if enabled
    if (homeCareEnabled) {
      if (!homeCareDailyPrice.trim()) {
        errors.push(
          t('carerPreferencesScreen.validation.homeCarePriceRequired')
        )
      } else {
        const price = parseFloat(homeCareDailyPrice)
        if (isNaN(price) || price <= 0) {
          errors.push(
            t('carerPreferencesScreen.validation.homeCarePriceInvalid')
          )
        }
      }
    }

    // Validate pet home care if enabled
    if (petHomeCareEnabled) {
      if (!petHomeCareVisitPrice.trim()) {
        errors.push(
          t('carerPreferencesScreen.validation.petHomeCarePriceRequired')
        )
      } else {
        const price = parseFloat(petHomeCareVisitPrice)
        if (isNaN(price) || price <= 0) {
          errors.push(
            t('carerPreferencesScreen.validation.petHomeCarePriceInvalid')
          )
        }
      }
    }

    if (homeCareEnabled || petHomeCareEnabled) {
      if (state.selectedPetTypes.length === 0) {
        errors.push(
          t('carerPreferencesScreen.validation.petPreferencesRequired')
        )
      }
    }

    return errors
  }

  const savePreferences = async (): Promise<void> => {
    setState((previous) => ({
      ...previous,
      loading: true,
    }))

    try {
      const carerConfig: CarerConfig = {
        homeCare: {
          enabled: state.homeCareEnabled,
          dayPrice: state.homeCareEnabled
            ? parseFloat(state.homeCareDailyPrice)
            : null,
        },
        petHomeCare: {
          enabled: state.petHomeCareEnabled,
          visitPrice: state.petHomeCareEnabled
            ? parseFloat(state.petHomeCareVisitPrice)
            : null,
        },
        petTypes: state.selectedPetTypes,
      }

      const updatedUser = await updateCarerConfigUseCase.execute(carerConfig)

      dispatch(setUser({ user: updatedUser.toPlainObject() }))

      setState((previous) => ({
        ...previous,
        loading: false,
        preferencesSaved: true,
      }))

      ShowToast({
        config: 'success',
        title: t('carerPreferencesScreen.success.title'),
        subtitle: t('carerPreferencesScreen.success.message'),
        duration: 3000,
      })
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: error.message,
      }))

      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: error.message,
        duration: 3000,
      })
    }
  }

  return {
    state,
    setHomeCareEnabled,
    setHomeCareDailyPrice,
    setPetHomeCareEnabled,
    setPetHomeCareVisitPrice,
    setSelectedPetTypes,
    validateForm,
    savePreferences,
  }
}

export { useCarerPreferencesViewModel }
