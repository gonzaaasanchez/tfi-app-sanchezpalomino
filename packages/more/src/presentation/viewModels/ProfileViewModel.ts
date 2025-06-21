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
} from '@app/common'
import { useState } from 'react'
import { $ } from '../../domain/di/Types'
import { UpdateProfileUseCase } from '../../domain/usecases/UpdateProfileUseCase'

type ProfileViewModel = {
  user: UserModel | null
  baseUrl: string
  state: ProfileState
  updateProfile: (userData: Partial<UserModel>) => Promise<void>
}

type ProfileState = {
  loading: boolean
  error: string | null
} & UIState

const useProfileViewModel = (): ProfileViewModel => {
  const dispatch = useDispatch()
  const [state, setState] = useState<ProfileState>({
    loading: false,
    error: null,
  })
  const userData = useSelector((state: AppState) => state.app.user)
  const baseUrl = useInjection(Types.BaseURL) as string
  const updateProfileUseCase: UpdateProfileUseCase = useInjection(
    $.UpdateProfileUseCase
  )
  const { t } = useI18n()

  // Crear instancia de UserModel para tener acceso a getAvatarUrl
  const user = userData ? new UserModel(userData) : null

  const updateProfile = async (userData: Partial<UserModel>): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const updatedUser = await updateProfileUseCase.execute(userData)

      // Convertir UserModel a objeto plano para Redux
      dispatch(setUser({ user: updatedUser.toPlainObject() }))
      setState((prev) => ({ ...prev, loading: false, error: null }))
      ShowToast({
        config: 'success',
        title: t('profileScreen.success.title'),
        subtitle: t('profileScreen.success.subtitle'),
      })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }))
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
  }
}

export { useProfileViewModel }
