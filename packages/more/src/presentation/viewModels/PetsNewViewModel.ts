import {
  UIState,
  PetType,
  PetCharacteristic,
  PetModel,
  useI18n,
  ShowToast,
  Color,
  LabelStyle,
  useInjection,
} from '@packages/common'
import { useState, useEffect } from 'react'
import { GetPetTypesUseCase } from '../../domain/usecases/GetPetTypesUseCase'
import { GetPetCharacteristicsUseCase } from '../../domain/usecases/GetPetCharacteristicsUseCase'
import { $ } from '../../domain/di/Types'

type PetsNewState = {
  pet: PetModel
  petTypesDatasource: PetType[]
  characteristicsDatasource: PetCharacteristic[]
  petSaved: boolean
} & UIState

type PetsNewViewModel = {
  state: PetsNewState
  setName: (name: string) => void
  setType: (value: any) => void
  setComment: (comment: string) => void
  addCharacteristic: () => void
  removeCharacteristic: (index: number) => void
  setCharacteristicType: (index: number, value: any) => void
  setCharacteristicValue: (
    index: number,
    field: '_id' | 'name' | 'value',
    value: string
  ) => void
  validateForm: (onValidated: () => void) => void
  savePet: () => void
}

const initialState: PetsNewState = {
  pet: {},
  petTypesDatasource: [],
  characteristicsDatasource: [],
  loading: false,
  error: null,
  petSaved: false,
}

const usePetsNewViewModel = (): PetsNewViewModel => {
  const [state, setState] = useState<PetsNewState>(initialState)
  const { t } = useI18n()

  const getPetTypesUseCase = useInjection<GetPetTypesUseCase>(
    $.GetPetTypesUseCase
  )
  const getPetCharacteristicsUseCase =
    useInjection<GetPetCharacteristicsUseCase>($.GetPetCharacteristicsUseCase)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async (): Promise<void> => {
    setState((previous) => ({ ...previous, loading: true }))

    try {
      const [petTypesResponse, characteristicsResponse] = await Promise.all([
        getPetTypesUseCase.execute(1, 100),
        getPetCharacteristicsUseCase.execute(1, 100),
      ])

      setState((previous) => ({
        ...previous,
        petTypesDatasource: petTypesResponse.items || [],
        characteristicsDatasource: characteristicsResponse.items || [],
        loading: false,
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        error: error instanceof Error ? error.message : 'Error loading data',
        loading: false,
      }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: error instanceof Error ? error.message : 'Error loading data',
      })
    }
  }

  const setName = (name: string): void => {
    setState((previous) => ({
      ...previous,
      pet: { ...previous.pet, name },
    }))
  }

  const setType = (value: any): void => {
    if (!Array.isArray(value)) {
      const selectedType = state.petTypesDatasource.find(
        (p) => p._id === value.value
      )
      setState((previous) => ({
        ...previous,
        pet: { ...previous.pet, petType: selectedType },
      }))
    }
  }

  const setComment = (comment: string): void => {
    setState((previous) => ({
      ...previous,
      pet: { ...previous.pet, comment },
    }))
  }

  const addCharacteristic = (): void => {
    setState((previous) => ({
      ...previous,
      pet: {
        ...previous.pet,
        characteristics: [
          ...(previous.pet.characteristics || []),
          { _id: '', name: '', value: '' },
        ],
      },
    }))
  }

  const removeCharacteristic = (index: number): void => {
    setState((previous) => {
      const newCharacteristics = [...(previous.pet.characteristics || [])]
      newCharacteristics.splice(index, 1)
      return {
        ...previous,
        pet: { ...previous.pet, characteristics: newCharacteristics },
      }
    })
  }

  const setCharacteristicType = (index: number, value: any): void => {
    if (!Array.isArray(value)) {
      const selectedChar = state.characteristicsDatasource.find(
        (c) => c._id === value.value
      )
      setCharacteristicValue(index, '_id', value.value)
      if (selectedChar) {
        setCharacteristicValue(index, 'name', selectedChar.name || '')
      }
    }
  }

  const setCharacteristicValue = (
    index: number,
    field: '_id' | 'name' | 'value',
    value: string
  ): void => {
    setState((previous) => {
      const newCharacteristics = [...(previous.pet.characteristics || [])]
      newCharacteristics[index] = {
        ...newCharacteristics[index],
        [field]: value,
        ...(field === '_id' && {
          name:
            state.characteristicsDatasource.find((c) => c._id === value)
              ?.name || '',
        }),
      }
      return {
        ...previous,
        pet: { ...previous.pet, characteristics: newCharacteristics },
      }
    })
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
    const { pet } = state

    if (!pet.name?.trim()) {
      errors.push(t('petsNewScreen.validation.nameRequired'))
    }

    if (!pet.petType?._id) {
      errors.push(t('petsNewScreen.validation.typeRequired'))
    }

    if (!pet.comment?.trim()) {
      errors.push(t('petsNewScreen.validation.commentRequired'))
    }

    if (pet.characteristics && pet.characteristics.length > 0) {
      pet.characteristics.forEach((char, index) => {
        if (!char._id || !char.name) {
          errors.push(
            t('petsNewScreen.validation.characteristicIncomplete', {
              index: String(index + 1),
            })
          )
        }
      })
    }

    return errors
  }

  const savePet = (): void => {
    setState((previous) => ({
      ...previous,
      loading: true,
    }))
    setTimeout(() => {
      setState((previous) => ({
        ...previous,
        loading: false,
        petSaved: true,
      }))
    }, 1000)
  }

  return {
    state,
    setName,
    setType,
    setComment,
    addCharacteristic,
    removeCharacteristic,
    setCharacteristicValue,
    setCharacteristicType,
    validateForm,
    savePet,
  }
}

export { usePetsNewViewModel }
