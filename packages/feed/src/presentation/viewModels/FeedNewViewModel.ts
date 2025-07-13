import {
  UIState,
  useI18n,
  ShowToast,
  Color,
  LabelStyle,
  useInjection,
  useImagePicker,
} from '@packages/common'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { $ } from '../../domain/di/Types'
import { CreatePostUseCase } from '../../domain/usecases/CreatePostUseCase'
import { markPostCreated } from '../../domain/store/FeedSlice'
import { useNavigation } from '@react-navigation/native'

type FeedNewState = {
  title: string | null
  description: string | null
  avatarFile: string | null
} & UIState

type FeedNewViewModel = {
  state: FeedNewState
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  selectImageFrom: (source: 'camera' | 'gallery') => Promise<void>
  validateForm: (onValidated: () => void) => void
  savePost: () => Promise<void>
}

const initialState: FeedNewState = {
  title: null,
  description: null,
  avatarFile: null,
  loading: false,
  error: null,
}

const useFeedNewViewModel = (): FeedNewViewModel => {
  const [state, setState] = useState<FeedNewState>(initialState)
  const { t } = useI18n()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const createPostUseCase: CreatePostUseCase = useInjection($.CreatePostUseCase)

  const {
    selectImageFromGallery: pickFromGallery,
    selectImageFromCamera: pickFromCamera,
  } = useImagePicker()

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

  const setTitle = (title: string): void => {
    setState((previous) => ({
      ...previous,
      title,
    }))
  }

  const setDescription = (description: string): void => {
    setState((previous) => ({
      ...previous,
      description,
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
    const { title, description, avatarFile } = state

    if (!title?.trim()) {
      errors.push(t('feedNewScreen.validation.titleRequired'))
    }

    if (!description?.trim()) {
      errors.push(t('feedNewScreen.validation.descriptionRequired'))
    }

    if (!avatarFile) {
      errors.push(t('feedNewScreen.validation.imageRequired'))
    }

    return errors
  }

  const savePost = async (): Promise<void> => {
    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      await createPostUseCase.execute({
        title: state.title,
        description: state.description,
        image: state.avatarFile,
      })

      setState((previous) => ({
        ...previous,
        loading: false,
      }))

      ShowToast({
        config: 'success',
        title: t('feedNewScreen.success.title'),
        subtitle: t('feedNewScreen.success.subtitle'),
      })

      navigation.goBack()
      dispatch(markPostCreated())
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
      }))

      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle:
          error instanceof Error ? error.message : 'Error creating post',
      })
    }
  }

  return {
    state,
    setTitle,
    setDescription,
    selectImageFrom,
    validateForm,
    savePost,
  }
}

export { useFeedNewViewModel }
