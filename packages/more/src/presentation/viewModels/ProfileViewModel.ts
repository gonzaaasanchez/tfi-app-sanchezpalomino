import { useSelector, useDispatch } from 'react-redux'
import {
  useInjection,
  Types,
  UserModel,
  AppState,
  setUser,
  UIState,
  ShowToast,
  useI18n,
  useImagePicker,
} from '@app/common'
import { useState } from 'react'
import { $ } from '../../domain/di/Types'
import { UpdateProfileUseCase } from '../../domain/usecases/UpdateProfileUseCase'

type ProfileViewModel = {
  user: UserModel | null
  baseUrl: string
  state: ProfileState
  updateProfile: (userData: Partial<UserModel>) => Promise<void>
  selectImageFrom: (source: 'camera' | 'gallery') => Promise<void>
}

type ProfileState = {
  loading: boolean
  error: string | null
  newAvatarFile: string | null
} & UIState

const useProfileViewModel = (): ProfileViewModel => {
  const dispatch = useDispatch()
  const [state, setState] = useState<ProfileState>({
    loading: false,
    error: null,
    newAvatarFile: null,
  })
  const userData = useSelector((state: AppState) => state.app.user)
  const baseUrl = useInjection(Types.BaseURL) as string
  const updateProfileUseCase: UpdateProfileUseCase = useInjection(
    $.UpdateProfileUseCase
  )
  const { t } = useI18n()
  const {
    selectImageFromGallery: pickFromGallery,
    selectImageFromCamera: pickFromCamera,
  } = useImagePicker()

  // Crear instancia de UserModel para tener acceso a getAvatarUrl
  const user = userData ? new UserModel(userData) : null

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
        newAvatarFile: uri,
      }))
    }
  }

  const updateProfile = async (userData: Partial<UserModel>): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const updatedUser = await updateProfileUseCase.execute(
        userData,
        state.newAvatarFile
      )

      // Convertir UserModel a objeto plano para Redux
      dispatch(setUser({ user: updatedUser.toPlainObject() }))

      setState((prev) => ({
        ...prev,
        loading: false,
        error: null,
        newAvatarFile: null,
      }))
      ShowToast({
        config: 'success',
        title: t('profileScreen.success.title'),
        subtitle: t('profileScreen.success.subtitle'),
      })
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }))
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: error.message,
      })
    }
  }

  return {
    user,
    baseUrl,
    state,
    updateProfile,
    selectImageFrom,
  }
}

export { useProfileViewModel }
