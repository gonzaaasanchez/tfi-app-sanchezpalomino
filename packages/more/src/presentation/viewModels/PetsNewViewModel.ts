import {
  UIState,
  PetType,
  PetCharacteristic,
  PetModel,
  useI18n,
  ShowToast,
  Color,
  LabelStyle,
} from '@packages/common'
import { useState } from 'react'

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
    field: 'id' | 'name' | 'value',
    value: string
  ) => void
  validateForm: (onValidated: () => void) => void
  savePet: () => void
}

const mockPetTypes: PetType[] = [
  { id: '1', name: 'Perro' },
  { id: '2', name: 'Gato' },
  { id: '3', name: 'Ave' },
  { id: '4', name: 'Otro' },
]

const mockCharacteristics: PetCharacteristic[] = [
  { id: '1', name: 'Tamaño' },
  { id: '2', name: 'Edad' },
  { id: '3', name: 'Personalidad' },
  { id: '4', name: 'Necesita medicación' },
]

const initialState: PetsNewState = {
  pet: {},
  petTypesDatasource: mockPetTypes,
  characteristicsDatasource: mockCharacteristics,
  loading: false,
  error: null,
  petSaved: false,
}

const usePetsNewViewModel = (): PetsNewViewModel => {
  const [state, setState] = useState<PetsNewState>(initialState)
  const { t } = useI18n()

  const setName = (name: string): void => {
    setState((previous) => ({
      ...previous,
      pet: { ...previous.pet, name },
    }))
  }

  const setType = (value: any): void => {
    if (!Array.isArray(value)) {
      const selectedType = mockPetTypes.find((p) => p.id === value.value)
      setState((previous) => ({
        ...previous,
        pet: { ...previous.pet, type: selectedType },
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
          { id: '', name: '', value: '' },
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
      const selectedChar = mockCharacteristics.find((c) => c.id === value.value)
      setCharacteristicValue(index, 'id', value.value)
      if (selectedChar) {
        setCharacteristicValue(index, 'name', selectedChar.name || '')
      }
    }
  }

  const setCharacteristicValue = (
    index: number,
    field: 'id' | 'name' | 'value',
    value: string
  ): void => {
    setState((previous) => {
      const newCharacteristics = [...(previous.pet.characteristics || [])]
      newCharacteristics[index] = {
        ...newCharacteristics[index],
        [field]: value,
        ...(field === 'id' && {
          name: mockCharacteristics.find((c) => c.id === value)?.name || '',
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

    if (!pet.type?.id) {
      errors.push(t('petsNewScreen.validation.typeRequired'))
    }

    if (!pet.comment?.trim()) {
      errors.push(t('petsNewScreen.validation.commentRequired'))
    }

    if (pet.characteristics && pet.characteristics.length > 0) {
      pet.characteristics.forEach((char, index) => {
        if (!char.id || !char.name || !char.value?.trim()) {
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
