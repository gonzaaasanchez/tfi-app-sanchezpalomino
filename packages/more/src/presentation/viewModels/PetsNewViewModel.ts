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
  useImagePicker,
} from '@packages/common'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GetPetTypesUseCase } from '../../domain/usecases/GetPetTypesUseCase'
import { GetPetCharacteristicsUseCase } from '../../domain/usecases/GetPetCharacteristicsUseCase'
import { SavePetUseCase } from '../../domain/usecases/SavePetUseCase'
import { $ } from '../../domain/di/Types'
import { markPetChange } from '../../domain/store/MoreSlice'
import { useNavigation } from '@react-navigation/native'

type PetsNewState = {
  pet: PetModel
  petTypesDatasource: PetType[]
  characteristicsDatasource: PetCharacteristic[]
  avatarFile: string | null
  isEditMode: boolean
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
  savePet: () => Promise<void>
  selectImageFrom: (source: 'camera' | 'gallery') => Promise<void>
}

const initialState: PetsNewState = {
  pet: {},
  petTypesDatasource: [],
  characteristicsDatasource: [],
  loading: false,
  error: null,
  avatarFile: null,
  isEditMode: false,
}

const usePetsNewViewModel = (initialPet?: PetModel): PetsNewViewModel => {
  const [state, setState] = useState<PetsNewState>({
    ...initialState,
    pet: initialPet || {},
    isEditMode: !!initialPet?.id,
  })
  const { t } = useI18n()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const getPetTypesUseCase = useInjection<GetPetTypesUseCase>(
    $.GetPetTypesUseCase
  )
  const getPetCharacteristicsUseCase =
    useInjection<GetPetCharacteristicsUseCase>($.GetPetCharacteristicsUseCase)
  const savePetUseCase = useInjection<SavePetUseCase>($.SavePetUseCase)

  const {
    selectImageFromGallery: pickFromGallery,
    selectImageFromCamera: pickFromCamera,
  } = useImagePicker()

  useEffect(() => {
    loadInitialData()
  }, [])

  // setup dropdowns for edit mode
  useEffect(() => {
    if (
      initialPet?.id &&
      state.petTypesDatasource.length > 0 &&
      state.characteristicsDatasource.length > 0
    ) {
      // Configurar el tipo de mascota
      const petTypeId =
        initialPet.petType?.id || (initialPet.petType as any)?.id
      if (petTypeId) {
        const selectedType = state.petTypesDatasource.find(
          (type) => type.id === petTypeId
        )
        if (selectedType) {
          setState((previous) => ({
            ...previous,
            pet: { ...previous.pet, petType: selectedType },
          }))
        }
      }

      // Configurar las características
      if (initialPet.characteristics && initialPet.characteristics.length > 0) {
        const configuredCharacteristics = initialPet.characteristics.map(
          (char) => {
            const characteristicId = char.id || (char as any).id
            const characteristic = state.characteristicsDatasource.find(
              (c) => c.id === characteristicId
            )
            return {
              id: characteristicId || '',
              name: characteristic?.name || char.name || '',
              value: char.value || '',
            }
          }
        )

        setState((previous) => ({
          ...previous,
          pet: { ...previous.pet, characteristics: configuredCharacteristics },
        }))
      }
    }
  }, [initialPet, state.petTypesDatasource, state.characteristicsDatasource])

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

  const selectImageFrom = async (
    source: 'camera' | 'gallery'
  ): Promise<void> => {
    const { uri, error } =
      source === 'camera' ? await pickFromCamera() : await pickFromGallery()

    if (error) {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: error,
      })
      return
    }

    if (uri) {
      setState((prev) => ({
        ...prev,
        avatarFile: uri,
      }))
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
        (p) => p.id === value.value
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
      const selectedChar = state.characteristicsDatasource.find(
        (c) => c.id === value.value
      )
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
          name:
            state.characteristicsDatasource.find((c) => c.id === value)?.name ||
            '',
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

    if (!pet.petType?.id) {
      errors.push(t('petsNewScreen.validation.typeRequired'))
    }

    if (!pet.comment?.trim()) {
      errors.push(t('petsNewScreen.validation.commentRequired'))
    }

    if (pet.characteristics && pet.characteristics.length > 0) {
      pet.characteristics.forEach((char, index) => {
        if (!char.id || !char.name) {
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

  const savePet = async (): Promise<void> => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      const savedPet = await savePetUseCase.execute(state.pet, state.avatarFile)

      setState((previous) => ({
        ...previous,
        loading: false,
      }))

      ShowToast({
        config: 'success',
        title: state.isEditMode
          ? t('petsNewScreen.success.updateTitle')
          : t('petsNewScreen.success.title'),
        subtitle: state.isEditMode
          ? t('petsNewScreen.success.updateSubtitle')
          : t('petsNewScreen.success.subtitle'),
      })

      navigation.goBack()
      dispatch(markPetChange())
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
    selectImageFrom,
  }
}

export { usePetsNewViewModel }
