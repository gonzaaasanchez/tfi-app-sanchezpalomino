import * as ImagePicker from 'expo-image-picker'
import { useI18n } from '../hooks/i18n'
import { ShowToast } from '../../components/Toast'

type ImagePickerResult = {
  uri: string | null
  error: string | null
}

export const useImagePicker = () => {
  const { t } = useI18n()

  const requestGalleryPermissions = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      ShowToast({
        config: 'error',
        title: t('profileScreen.permissions.title'),
        subtitle: t('profileScreen.permissions.gallery'),
      })
      return false
    }
    return true
  }

  const requestCameraPermissions = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      ShowToast({
        config: 'error',
        title: t('profileScreen.permissions.title'),
        subtitle: t('profileScreen.permissions.camera'),
      })
      return false
    }
    return true
  }

  const selectImageFromGallery = async (): Promise<ImagePickerResult> => {
    const hasPermission = await requestGalleryPermissions()
    if (!hasPermission) {
      return { uri: null, error: 'Permisos de galería denegados' }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        return { uri: result.assets[0].uri, error: null }
      }

      return { uri: null, error: null } // Usuario canceló
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido'
      return { uri: null, error: errorMessage }
    }
  }

  const selectImageFromCamera = async (): Promise<ImagePickerResult> => {
    const hasPermission = await requestCameraPermissions()

    if (!hasPermission) {
      return { uri: null, error: 'Permisos de cámara denegados' }
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        return { uri: result.assets[0].uri, error: null }
      }

      return { uri: null, error: null } // Usuario canceló
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido'
      return { uri: null, error: errorMessage }
    }
  }

  return {
    selectImageFromGallery,
    selectImageFromCamera,
  }
}
