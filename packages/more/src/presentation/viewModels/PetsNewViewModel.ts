import { UIState, PetType, PetCharacteristic } from '@packages/common'
import { useState } from 'react'

type PetsNewState = {
  name: string
  comment: string
  selectedPetType?: PetType
  selectedCharacteristics: PetCharacteristic[]
  petTypesDatasource: PetType[]
  characteristicsDatasource: PetCharacteristic[]
} & UIState

type PetsNewViewModel = {
  state: PetsNewState
  setName: (name: string) => void
  setType: (type: string) => void
  setComment: (comment: string) => void
  addCharacteristic: () => void
  removeCharacteristic: (index: number) => void
  updateCharacteristic: (
    index: number,
    field: 'id' | 'name' | 'value',
    value: string
  ) => void
  handleTypeSelection: (value: any) => void
  handleCharacteristicSelection: (index: number, value: any) => void
  handleSave: (onConfirm: () => void) => void
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
  name: '',
  comment: '',
  selectedPetType: undefined,
  selectedCharacteristics: [],
  petTypesDatasource: mockPetTypes,
  characteristicsDatasource: mockCharacteristics,
  loading: false,
  error: null,
}

const usePetsNewViewModel = (): PetsNewViewModel => {
  const [state, setState] = useState<PetsNewState>(initialState)

  const setName = (name: string): void => {
    setState((previous) => ({ ...previous, name }))
  }

  const setType = (type: string): void => {
    setState((previous) => ({ ...previous, selectedPetType: mockPetTypes.find(p => p.id === type) }))
  }

  const setComment = (comment: string): void => {
    setState((previous) => ({ ...previous, comment }))
  }

  const addCharacteristic = (): void => {
    setState((previous) => ({
      ...previous,
      selectedCharacteristics: [
        ...previous.selectedCharacteristics,
        { id: '', name: '', value: '' },
      ],
    }))
  }

  const removeCharacteristic = (index: number): void => {
    setState((previous) => {
      const newCharacteristics = [...previous.selectedCharacteristics]
      newCharacteristics.splice(index, 1)
      return { ...previous, selectedCharacteristics: newCharacteristics }
    })
  }

  const updateCharacteristic = (
    index: number,
    field: 'id' | 'name' | 'value',
    value: string
  ): void => {
    setState((previous) => {
      const newCharacteristics = [...previous.selectedCharacteristics]
      newCharacteristics[index] = {
        ...newCharacteristics[index],
        [field]: value,
        ...(field === 'id' && {
          name: mockCharacteristics.find((c) => c.value === value)?.value || '',
        }),
      }
      return { ...previous, selectedCharacteristics: newCharacteristics }
    })
  }

  const handleSave = (onConfirm: () => void): void => {
    // Aquí se puede agregar lógica de validación antes de mostrar el modal
    onConfirm()
  }

  const handleTypeSelection = (value: any): void => {
    if (!Array.isArray(value)) {
      setState((previous) => ({ 
        ...previous, 
        selectedPetType: mockPetTypes.find(p => p.id === value.value) 
      }))
    }
  }

  const handleCharacteristicSelection = (index: number, value: any): void => {
    if (!Array.isArray(value)) {
      const selectedChar = mockCharacteristics.find(c => c.id === value.value)
      updateCharacteristic(index, 'id', value.value)
      if (selectedChar) {
        updateCharacteristic(index, 'name', selectedChar.name || '')
      }
    }
  }

  return {
    state,
    setName,
    setType,
    setComment,
    addCharacteristic,
    removeCharacteristic,
    updateCharacteristic,
    handleTypeSelection,
    handleCharacteristicSelection,
    handleSave,
  }
}

export { usePetsNewViewModel }
export type { PetCharacteristic }
